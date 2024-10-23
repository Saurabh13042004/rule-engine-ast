const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');


router.post('/rules', ruleController.createRule);


router.get('/rules', ruleController.getAllRules);


router.post('/evaluate', ruleController.evaluateRule);

module.exports = router;
