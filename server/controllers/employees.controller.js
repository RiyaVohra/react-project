
const Employee = require('../models/employees.model');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.employee_create = function (req, res) {
    console.log(req.body);
    let employee = new Employee(
        {   _id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender,
            survey_assigned: req.body.survey_assigned
        }
    );
    //saves the new created employee in db
    employee.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Employee Created successfully')
    });
};

exports.employee_getID = function (req, res, next) {
    console.log(req.body);
    Employee.findById(req.params.id, function (err, employee) {
        if (err) return next(err);
        res.send(employee);
    })
};

exports.employee_getList = function (req, res) {
    res.contentType('application/json');
    console.log('Finding employee !!');
    Employee.find({}, function(err, employees) {
        console.log('Found employee !!');
        if (employees != null) {
            console.log('Found the User:' + employees);
            res.send(JSON.stringify(employees));
        }
    });

};

