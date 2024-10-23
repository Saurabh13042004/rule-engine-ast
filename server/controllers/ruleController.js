const pool = require('../config/db');
const { parseRule, evaluateAST } = require('../ast');


exports.createRule = async (req, res) => {
  const { ruleName, ruleString } = req.body;
  try {
    const ast = parseRule(ruleString);         
    const astString = JSON.stringify(ast);      
    const result = await pool.query(
      'INSERT INTO rules (rule_name, ast) VALUES ($1, $2) RETURNING *',
      [ruleName, astString]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create rule' });
  }
};

exports.getAllRules = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM rules');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch rules' });
  }
};


exports.evaluateRule = async (req, res) => {
  const { ruleId, data } = req.body;
  try {
    const result = await pool.query('SELECT * FROM rules WHERE id = $1', [ruleId]);
    const rule = result.rows[0];

    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const ast = JSON.parse(rule.ast);
    const evaluationResult = evaluateAST(ast, data);

    res.status(200).json({ result: evaluationResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to evaluate rule' });
  }
};
