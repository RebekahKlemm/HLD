var Sequelize = require('sequelize');
var db = require('../_db');

var interestSchema = {
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    }
};


var interestConfig = {};



const User = db.define('interest', interestSchema, interestConfig);

module.exports = User;
