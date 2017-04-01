var Sequelize = require('sequelize');
var db = require('../_db');

var userSchema = {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
    },
};


var userConfig = {
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
                // console.log('here is the response.results', response.json.results[0].geometry.location);
                // if (err) {
                //     throw new Error('Please enter a valid U.S. address')
                //     // return Sequelize.Promise.reject("Please enter a valid U.S. address")
                //
                // }
                var latLong = response.json.results[0].geometry.location;
                openstates.geoLookup(latLong.lat, latLong.lng, function(err2, json) {
                    // console.log('here is err2', err2)
                    // console.log('here is json', json)
                    // if (err2) {
                    //     // return Sequelize.Promise.reject("Please enter a valid U.S. address")
                    //     throw new Error('Please enter a valid U.S. address from err2');
                    // }

                });
                // if (response.json.results.length === 0) {
                //     // Sequelize.Promise.reject("You must enter a valid U.S. address")
                //     alert("You must enter a valid U.S. address")
                //         .catch(err)
                // } else {
                // }
            })
        }
    },
    getterMethods: {
        fullName: function() {
            return this.firstName + ' ' + this.lastName
        }
    },
    // instanceMethods: {
    //     fullName: function(){
    //         return this.firstName + ' ' + this.lastName
    //     }
    // }
    // getterMethods: {
    //     fullName: function (){
    //         return this.getDataValue('firstName') + ' ' + this.getDataValue('lastName');
    //     }
    // }
    // getterMethods: {
    //     latLongRoute: function () {
    //         return '/api/users/' + this.phone + '/latLong';
    //     }
    // }

};



const User = db.define('user', userSchema, userConfig);

module.exports = User;
