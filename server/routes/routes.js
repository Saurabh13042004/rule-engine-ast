const express = require('express');
const router = express.Router();
const { createRule, getAllRules } = require('./db_functions');


router.post('/rules', async (req, res) => {
  const { ruleName, ruleExpression } = req.body;
  try {
    const newRule = await createRule(ruleName, ruleExpression);
    res.status(201).json(newRule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create rule' });
  }
});


router.get('/rules', async (req, res) => {
  try {
    const rules = await getAllRules();
    res.status(200).json(rules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rules' });
  }
});

module.exports = router;
