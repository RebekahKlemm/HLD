var Sequelize = require('sequelize');
var db = require('../_db');

var advocateSchema = {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    notesAttendee: {
        type: Sequelize.TEXT
    },
    congDist: {
        type: Sequelize.STRING
    },
    senDist: {
        type: Sequelize.STRING
    },
    houseDist: {
        type: Sequelize.STRING
    },
    street1: {
        type: Sequelize.STRING
    },
    street2: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.STRING
    },
    senator: {
        type: Sequelize.STRING
    },
    senOffice: {
        type: Sequelize.STRING
    },
    senSessionPhone: {
        type: Sequelize.STRING
    },
    senEmail: {
        type: Sequelize.STRING
    },
    senNotes: {
        type: Sequelize.TEXT
    },
    representative: {
        type: Sequelize.STRING
    },
    repOffice: {
        type: Sequelize.STRING
    },
    repSessionPhone: {
        type: Sequelize.STRING
    },
    repEmail: {
        type: Sequelize.STRING
    },
    repNotes: {
        type: Sequelize.TEXT
    },
    checkedIn: {
        type: Sequelize.ENUM('yes', 'no', 'cancelled'),
        defaultValue: 'no'
    },
};


var advocateConfig = {
    hooks: {
        beforeValidate: function(user) {
            // console.log('got into the beforeValidate hook in the user model, here is user', user)
            var googleMapsClient = require('@google/maps').createClient({
                key: 'AIzaSyBFetAhXRcymhUCT9_2_k-nEs8TEkDiOo8'
            });
            const OpenStates = require('openstates');
            var openstates = new OpenStates('abc');
            googleMapsClient.geocode({
                address: user.address
            }, function(err, response) {
                var latLong = response.json.results[0].geometry.location;
                openstates.geoLookup(latLong.lat, latLong.lng, function(err2, json) {
                });

            })
        }
    },
    getterMethods: {
        fullName: function() {
            return this.firstName + ' ' + this.lastName
        }
    },

};


const Advocate = db.define('advocate', advocateSchema, advocateConfig);

module.exports = Advocate;
