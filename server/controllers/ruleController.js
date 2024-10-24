const db = require('../config/db');
const { parseRule, combineRules, evaluateAST } = require('../utils/parser');
const {serializeAST} = require('../utils/ast')

exports.createRule = async (req, res) => {
  try {
      const { ruleName, ruleString } = req.body;
      const ast = parseRule(ruleString); 
      const serializedAST = serializeAST(ast);  

      const result = await db.query(
          'INSERT INTO rules (name, rule_string, ast) VALUES ($1, $2, $3) RETURNING *',
          [ruleName, ruleString, JSON.stringify(serializedAST)]
      );

      res.status(201).json({
          success: true,
          rule: result.rows[0],
      });
  } catch (error) {
      console.error('Error creating rule:', error);
      res.status(500).json({ error: 'Failed to create rule', details: error.message });
  }
};

// Combine multiple rules and store the combined AST
exports.combineRules = async (req, res) => {
  try {
    const { ruleIds, operator } = req.body;

    // Fetch the rules by their IDs
    const results = await db.query('SELECT ast FROM rules WHERE id = ANY($1)', [ruleIds]);
    const asts = results.rows.map(row => JSON.parse(row.ast));

    // Combine the rules into a single AST
    const combinedAST = combineRules(asts, operator);

    res.status(200).json({
      success: true,
      combinedAST,
    });
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(500).json({ error: 'Failed to combine rules' });
  }
};

// Evaluate a rule against user data
exports.evaluateRule = async (req, res) => {
  try {
    const { ruleId, data } = req.body;

    // Fetch the AST for the rule
    const result = await db.query('SELECT ast FROM rules WHERE id = $1', [ruleId]);
    const ast = JSON.parse(result.rows[0].ast);

    // Evaluate the AST against the user data
    const isEligible = evaluateAST(ast, data);

    res.status(200).json({
      success: true,
      eligible: isEligible,
    });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(500).json({ error: 'Failed to evaluate rule' });
  }
};
