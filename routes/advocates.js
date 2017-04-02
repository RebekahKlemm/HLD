const express = require('express');
const db = require('../Database/_db');
const {User, LatLong, Advocate} = require('../Database/Models/index');

// This router is mounted on /api/advocates
const router = express.Router();

router.get('/', function(req, res, next){
    Advocate.findAll()
        .then(function(advocates){
            res.send(advocates)
        })
        .catch(function(error){
            res.send('You got an error in the routes/advocates get api call');
        })
})

router.post('/add', function(req, res, next){
    Advocate.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        notesAttendee: req.body.notesAttendee,
        congDist: req.body.congDist,
        senDist: req.body.senDist,
        houseDist: req.body.houseDist,
        street1: req.body.street1,
        street2: req.body.street2,
        city: req.body.city,
        zip: req.body.zip,
        senator: req.body.senator,
        senEmail: req.body.senEmail,
        senNotes: req.body.senNotes,
        representative: req.body.representative,
        repEmail: req.body.repEmail,
        repNotes: req.body.repNotes,
        checkedIn: req.body.checkedIn
    })
})

router.post('/checkIn', function(req, res, next){
    console.log('checkIn req', req);
    Advocate.findOne({
        where:{id: req.body[0]}
    })
        .then(function (advocate){
            advocate.checkedIn = req.body[1];
            advocate.save();
            return advocate;
        })
        .then(function (advocate){
            res.send(advocate);
        })
})

router.get('/:id', function (req, res, next) {
    Advocate.findOne({
        where: {id: req.params.id}
    })
        .then(function (advocate) {
            res.send(advocate)
        })
        .catch(next);
});


//This route demonstrates eager loading
// router.get('/', function (req, res, next){
//     User.findAll({ include: [ LatLong ] })
//         .then(function(users){
//             res.send(users);
//         })
// });


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


module.exports = router;

