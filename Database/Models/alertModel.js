var Sequelize = require('sequelize');
var db = require('../_db');
var Deadline = require('./deadlineModel');

var alertSchema = {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
};


var alertConfig = {
    instanceMethods: {
        getDeadline: function(){
            Deadline.findOne({where: {
                id: this.deadlineId
            }})
                .then(function(deadline){
                    return deadline
                })
        }
    }
};

const Alert = db.define('alert', alertSchema, alertConfig);




module.exports = Alert;
