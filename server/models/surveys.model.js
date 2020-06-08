const mongoose = require('mongoose');


let surveySchema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    assignedEmployee: [{type: String}]
});

module.exports =  mongoose.model('surveys', surveySchema);