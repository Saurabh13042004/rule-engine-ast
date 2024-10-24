const db = require("../config/db");
const { parseRule, combineRules, evaluateAST } = require("../utils/parser");
const { serializeAST } = require("../utils/ast");

// Function to create a new rule in the database
exports.createRule = async (req, res) => {
  try {
    const { ruleName, ruleString } = req.body;

    const ast = parseRule(ruleString);
    const serializedAST = serializeAST(ast);

    // Save rule in database
    const insertQuery = `
      INSERT INTO rules (rule_name, rule_string, ast)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    
    const values = [ruleName, ruleString, JSON.stringify(serializedAST)];
    const result = await db.query(insertQuery, values);

    res.json({
      success: true,
      rule: {
        id: result.rows[0].id,
        name: ruleName,
        rule_string: ruleString,
        ast: serializedAST,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error parsing rule",
      error: error.message,
    });
  }
};

// Function to combine rules and save the combined result in the database
exports.combineRules = async (req, res) => {
  try {
    const { rules, operator = "AND" } = req.body;

    if (!Array.isArray(rules) || rules.length === 0) {
      return res.status(400).json({ success: false, message: "No rules provided" });
    }

    const asts = rules.map((rule) => {
      if (typeof rule !== "string") {
        throw new Error("Each rule must be a string");
      }
      return parseRule(rule);
    });

    const combinedAST = combineRules(asts, operator);
    const serializedCombinedAST = serializeAST(combinedAST);

    // Save combined rules in database
    const insertQuery = `
      INSERT INTO combined_rules (operator, ast)
      VALUES ($1, $2)
      RETURNING id;
    `;
    
    const values = [operator, JSON.stringify(serializedCombinedAST)];
    await db.query(insertQuery, values);

    res.json({
      success: true,
      ast: serializedCombinedAST,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error combining rules",
      error: error.message,
    });
  }
};

// Function to evaluate a rule and save the evaluation result in the database
exports.evaluateRule = async (req, res) => {
  try {
    const { ast, data } = req.body;

    const rebuiltAST = ast;
    const evaluationResult = evaluateAST(rebuiltAST, data);

    // Save evaluation result in database
    const insertQuery = `
      INSERT INTO evaluations (ast_id, result)
      VALUES ($1, $2)
      RETURNING id;
    `;
    
    // Assuming you have an ID for the AST being evaluated; you may need to adjust this.
    const values = [ast.id || null, evaluationResult]; 
    await db.query(insertQuery, values);

    res.json({
      success: true,
      result: evaluationResult,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error evaluating rule",
      error: error.message,
    });
  }
};