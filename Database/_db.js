const Sequelize = require('sequelize');


const db = new Sequelize('postgres://localhost:5432/animalalerts', {
    logging: false
});

db.authenticate()
    .then(function(err) {
        console.log('Database connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = db;
