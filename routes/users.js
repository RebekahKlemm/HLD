const express = require('express');
const db = require('../Database/_db');
// const User = require('../Database/Models/userModel');
const {User, LatLong} = require('../Database/Models/index');

// This router is mounted on /api/users
const router = express.Router();


//This route demonstrates eager loading
router.get('/', function (req, res, next){
    User.findAll({ include: [ LatLong ] })
        .then(function(users){
            res.send(users);
        })
});


router.post('/signup', function (req, res, next){
    // console.log('do I have req.session?', req.session)
    const sess = req.session;
    User.create({
        firstName: req.body.first,
        lastName: req.body.last,
        address: req.body.address,
        phone: req.body.phone,
        password: req.body.password
    })
        .then(function(newUser){
            if (newUser){
                newUser.setInterests(req.body.interests)
                    .then(() => sess.user=newUser)
                    .then(function(){
                        // console.log('in signup route, here is sess', sess)
                    res.status(201).send(newUser)
                        // res.redirect('#/user/' + newUser.phone)
                    })

            }
        })
        .catch(next);
});

router.post('/login', function(req, res, next){
    const sess = req.session;
    console.log('routes, login, here is req.body', req.body)
    console.log('routes, login, here is sess before', sess)
    User.findOne({
        where: {phone: req.body.phone, password: req.body.password}
    })
        .then((user) => {
            sess.user = user;
            console.log('routes, login, here is sess after', sess)
            res.status(200).send(user);
        })

})

router.get('/logout', function(req, res){
    req.session.destroy(function(){
        console.log("user logged out.")
    });
    res.redirect('/#/login');
});


// router.post('/signup', (req, res, next) => {
//     return User.find({where: {email: req.body.email}})
//         .then((user) => {
//             if (!user) {
//                 User.create({email: req.body.email});
//                 res.cookie('email', req.body.email);
//                 res.send();
//             }
//             else{
//                 res.send("User already signed up");
//             }
//         })
// })

//this code works (without sessions)
// router.post('/signup', function (req, res, next){
//     User.create({
//         firstName: req.body.first,
//         lastName: req.body.last,
//         address: req.body.address,
//         phone: req.body.phone,
//         password: req.body.password
//     })
//         .then(function(newUser){
//             if (newUser){
//                 newUser.setInterests(req.body.interests)
//                     .then(res.status(201).send(newUser))
//
//             }
//         })
//         .catch(next);
// });

function checkSignIn(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        var err = new Error("Not logged in!");
        console.log(req.session.user);
        next(err);  //Error, trying to access unauthorized page!
    }
}


router.get('/:id', checkSignIn, function(req, res, next){
// router.get('/:id', function(req, res, next){
    if(req.session.user.phone === req.params.id){
        User.findOne({
            where: {phone: req.params.id}
        })
            .then(function(user){
                console.log('------------>inside user router /:id, here is req.session', req.session)
                res.send(user);
            })
    } else {
        var err = new Error('Unauthorized');
        // console.log(req.session.user);
        next(err);
    }

})





var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBFetAhXRcymhUCT9_2_k-nEs8TEkDiOo8'
});

router.get('/:id/latLong', function(req, res, next){
    User.findOne({
        where: {phone: req.params.id}
    })
        .then(function(user){
            // Geocode an address.
            googleMapsClient.geocode({
                address: user.address
            }, function(err, response) {
                if (!err) {
                    res.send(response.json.results[0].geometry.location);
                }
            });
        })

})


//
router.post('/:id/latLong', function (req, res, next){
    User.findOne({
        where: {phone: req.params.id}
    })
        .then(function(user){
            LatLong.create({
                lat: req.body.lat,
                long: req.body.lng
            })
                .then(function(latLong){
                    // console.log('~~~~~~~~~~~~~user', user)
                    // console.log('~~~~~~~~~~~~~latLong', latLong)
                    user.setLatLong(latLong);
                    // console.log('~~~~~~~~~~~~~user AFTER LATLONG', user)

                    return latLong;
                })
                .then(latLong => res.send(latLong))
            }
        )
});


const OpenStates = require('openstates');

var openstates = new OpenStates('abc');

router.get('/:id/legislators', function(req, res, next){
    User.findOne({
        where: {phone: req.params.id}
    })
        .then(function(user){
            user.getLatLong()
                .then(function (latLong){
                    // console.log('user.getLatLong', latLong)
                    return latLong;
                })
                .then(function(latLong){
                    openstates.geoLookup(latLong.lat, latLong.long, function(err, json) {
                        if (err) throw err;
                        res.send(json);
                    });
                })

        })


})


//this takes an array, where the first object is the user, and the second is a string that identifies the new role
router.post('/changeUserRole', function (req, res, next){
    User.findOne({
        where: {phone: req.body[0].phone}
    })
        .then(function(user) {
            return user.update({
                role: req.body[1]
            })
        }).then(user => res.send(user));
});


//this takes an array, where the first object is the oldUser, and the second is the newUser; editUinDb relies on this to return latLong coordinates
router.post('/edit', function (req, res, next){
    User.findOne({
        where: {phone: req.body[0].phone}
    })
        .then(function(user){
            return user.update({
                firstName: req.body[1].first,
                lastName: req.body[1].last,
                address: req.body[1].address,
                password: req.body[1].password
            })
        })
        .then(function(user){
            user.setInterests(req.body[1].interests);
            return user;
        })
        .then(function(user) {
            //geocode the new address
             googleMapsClient.geocode({
                address: user.address
            }, function(err, response) {
                if (!err) {
                    res.send(response.json.results[0].geometry.location);
                }
            })
        })

});

router.post('/delete', function(req, res, next){
    User.findOne({where: {phone: req.body.phone}})
        .then(function(user){
            user.destroy()
                .then(function(){
                    User.findAll({ include: [ LatLong ] })
                        .then(function(users){
                            res.send(users);
                        })
                })
        })

})


module.exports = router;
