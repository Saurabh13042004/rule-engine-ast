const { createOperatorNode, createOperandNode } = require("./ast");

const tokenizeRuleString = (ruleString) => {
  return ruleString.match(/(?:[a-zA-Z_]+\s*[><=]\s*'?\w+'?)|AND|OR|\(|\)/g);
};

const parseTokens = (tokens) => {
  let index = 0;

  function parseExpression() {
    let node = parseTerm();

    while (index < tokens.length && tokens[index] === "OR") {
      const operator = tokens[index++];
      const right = parseTerm();
      node = createOperatorNode(operator, node, right);
    }
    return node;
  }

  function parseTerm() {
    let node = parseFactor();

    while (index < tokens.length && tokens[index] === "AND") {
      const operator = tokens[index++];
      const right = parseFactor();
      node = createOperatorNode(operator, node, right);
    }
    return node;
  }

  function parseFactor() {
    const token = tokens[index++];

    if (token === "(") {
      const node = parseExpression();
      index++;
      return node;
    } else {
      return createOperandNode(token);
    }
  }

  return parseExpression();
};

const parseRule = (ruleString) => {
  const tokens = tokenizeRuleString(ruleString);
  return parseTokens(tokens);
};

const combineRules = (astArray, operator = "AND") => {
  if (astArray.length === 1) return astArray[0];

  let combinedAST = astArray[0];

  for (let i = 1; i < astArray.length; i++) {
    combinedAST = createOperatorNode(operator, combinedAST, astArray[i]);
  }

  return combinedAST;
};

const evaluateAST = (node, data) => {
  if (node.type === "operator") {
    const leftEval = evaluateAST(node.left, data);
    const rightEval = evaluateAST(node.right, data);

    if (node.value === "AND") {
      return leftEval && rightEval;
    } else if (node.value === "OR") {
      return leftEval || rightEval;
    }
  } else if (node.type === "operand") {
    const [field, operator, value] = node.value.split(" ");

    if (operator === ">") return data[field] > parseFloat(value);
    if (operator === "<") return data[field] < parseFloat(value);
    if (operator === "=") return data[field] === value.replace(/['"]/g, "");

    return false;
  }
};

module.exports = {
  parseRule,
  combineRules,
  evaluateAST,
};
