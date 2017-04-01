var Sequelize = require('sequelize');
var db = require('../_db');

var latLongSchema = {
    lat: {
        type: Sequelize.STRING
    },
    long: {
        type: Sequelize.STRING
    }
};


var latLongConfig = { };



const LatLong = db.define('latLong', latLongSchema, latLongConfig);

module.exports = LatLong;
