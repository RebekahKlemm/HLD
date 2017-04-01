var Sequelize = require('sequelize');
var db = require('../_db');

var deadlineSchema = {
    due: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
};


var deadlineConfig = {};

const Deadline = db.define('deadline', deadlineSchema, deadlineConfig);




module.exports = Deadline;
