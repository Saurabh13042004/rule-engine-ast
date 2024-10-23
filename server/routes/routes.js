const express = require('express');
const router = express.Router();
const { saveRule, getAllRules } = require('./db_functions');
const { parseRule, evaluateAST } = require('./ast');

router.post('/rules', async (req, res) => {
  const { ruleName, ruleString } = req.body;
  try {
    const ast = parseRule(ruleString);
    const astString = JSON.stringify(ast);  
    const newRule = await saveRule(ruleName, astString);
    res.status(201).json(newRule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create rule' });
  }
});


router.post('/evaluate', async (req, res) => {
  const { ruleId, data } = req.body;
  try {
    const rules = await getAllRules();
    const rule = rules.find(r => r.id === ruleId);

    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const ast = JSON.parse(rule.ast);
    const result = evaluateAST(ast, data);

    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to evaluate rule' });
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
