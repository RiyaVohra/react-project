
const Survey = require('../models/surveys.model');



exports.survey_create = function (req, res) {
    console.log(req.body);
    let survey = new Survey(
        {  name:req.body.name,
           assignedEmployee:req.body.assignedEmployee

        }
    );
    //saves the new created employee in db
    survey.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Surveys Created successfully')
    });
};

exports.survey_getByName = function (req, res, next) {
    console.log(req.body);
    Survey.find(req.params.name, function (err, survey) {
        if (err) return next(err);
        res.send(survey);
    })
};

exports.survey_getList = function (req, res) {
    res.contentType('application/json');
    console.log('Finding survey !!');
    Survey.find({}, function(err, surveys) {
        console.log('Found survey !!');
        if (surveys != null) {
            res.send(JSON.stringify(surveys));
        }
    });
};
 exports.survey_update_add = function (req,res) {
     Survey.findOneAndUpdate({ name: req.params.name }, { $push: { assignedEmployee: [req.params.employee] } }, {new: true},
         function (err, result) {
             if (err) {
                 res.send(err);
             } else {
                 res.json(result);
             }
         }
     );
 };
exports.survey_update_remove = function (req,res) {
    Survey.findOneAndUpdate({ name: req.params.name }, { $pop: { assignedEmployee: [req.params.employee] } }, {new: true},
        function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
};
