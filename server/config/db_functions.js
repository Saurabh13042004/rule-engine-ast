const pool = require('./db');


async function saveRule(ruleName, astString) {
  const result = await pool.query(
    'INSERT INTO rules (rule_name, ast) VALUES ($1, $2) RETURNING *',
    [ruleName, astString]
  );
  return result.rows[0];
}


async function getAllRules() {
  const result = await pool.query('SELECT * FROM rules');
  return result.rows;
}

module.exports = {
  saveRule,
  getAllRules,
};
