const express = require('express');
const router = express.Router();


const employee_controller = require('../controllers/employees.controller');
const survey_controller = require('../controllers/surveys.controller');


// a simple test url to check that all of our files are communicating correctly.
//router.get('/test', employee_controller.test);
router.post('/create', employee_controller.employee_create);
//router.get('/:id', employee_controller.employee_getID);
router.get('/employeelist', employee_controller.employee_getList);


// a simple test url to check that all of our files are communicating correctly.
//router.get('/test', employee_controller.test);
router.post('/createsurvey', survey_controller.survey_create);
//router.get('/:id', employee_controller.employee_getID);
router.get('/surveylist', survey_controller.survey_getList);

router.put('/updatesurveyadd',survey_controller.surveyupdateadd);
router.put('/updatesurveyremove',survey_controller.surveyupdateremove);

module.exports = router;

