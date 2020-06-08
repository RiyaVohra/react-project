const mongoose = require('mongoose');


let employeeSchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true},
    gender: {type: String, required: true},
    survey_assigned:  [{type: String}]
});

module.exports =  mongoose.model('employees', employeeSchema);