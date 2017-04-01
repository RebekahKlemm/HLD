const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const db = require('./Database/_db');

const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const {User, Alert, Interest, LatLong, Deadline} = require('./Database/Models/index');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: false, secret: 'veryhushhush', cookie: { maxAge: 60000 }}));


const apiRouter = require('./routes/apiRouter');

//here are my API routes
app.use('/api', apiRouter);

//Here is where I serve up the first page
app.get('/', function (req, res, next) {
    // console.log('in app.js, here is req.session', req.session)
    res.sendFile(path.join(__dirname, './components/index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500).send(err);
});


//Synch the database
// db.sync()

// Reset and re-seed the database:
db.sync({force: true})
    .then(function(){
        return User.bulkCreate([
            {firstName: 'Joe', lastName: 'Smith', address: '1503 Nicks Dr, Stevens Point, WI 54482', phone: '123', password: 'joe'},
            {firstName: 'Bill', lastName: 'Johnson', address: '1542 E Military Rd, Superior, WI 54880', phone: '456', password: 'bill'},
            {firstName: 'Susie', lastName: 'Williams', address: '12700 12th St, Kenosha, WI 53144', phone: '789', password: 'admin', role: 'admin'}
        ])
    })
    .spread(function(joe, bill, susie){
        User.findOne({where:{ phone: joe.phone}})
            .then(function(user){
                LatLong.create({
                    lat: 44.521200,
                    long:-89.521800
                })
                    .then(function(latLong1){
                        user.setLatLong(latLong1);
                        user.setInterests(['wildlife']);
                    })
            })
        User.findOne({where:{ phone: bill.phone}})
            .then(function(user){
                LatLong.create({
                    lat: 46.606755,
                    long:-92.227903
                })
                    .then(function(latLong1){
                        user.setLatLong(latLong1);
                        user.setInterests(['domestic pets']);
                    })
            })
        User.findOne({where:{ phone: susie.phone}})
            .then(function(user){
                LatLong.create({
                    lat: 42.642076,
                    long:-87.962181
                })
                    .then(function(latLong1){
                        user.setLatLong(latLong1);
                        user.setInterests(['farm animals']);
                    })
            })

    })
    .then(function(){
        Deadline.create({due: '2017-03-15'})
            .then(function (deadline){
                Alert.create({
                    body: 'Call your Senator about wildlife'
                })
                    .then(function(alert){
                        alert.setInterests(['wildlife']);
                        alert.setDeadline(1);
                        deadline.setAlerts([alert])
                    })

            })

    })
    .then(function(){
        Deadline.create({due: '2017-02-13'})
            .then(function(deadline){
                Alert.create({
                    body: 'Call your Representative about domestic pets'
                })
                    .then(function(alert){
                        alert.setInterests(['domestic pets']);
                        alert.setDeadline(2);
                        deadline.setAlerts([alert])
                    })
            })

    })
    .then(function(){
        Interest.bulkCreate([
            {category: 'wildlife'},
            {category: 'farm animals'},
            {category: 'domestic pets'}
        ])
    })
    .then(function () {
    app.listen(3001, function () {
        console.log('Server is listening on port 3001');
    });
})
    .catch(console.error);


module.exports = app;