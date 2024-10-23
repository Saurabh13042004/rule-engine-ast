
class Node {
    constructor(type, left = null, right = null, value = null) {
      this.type = type; 
      this.left = left;
      this.right = right;
      this.value = value; 
    }
  }

  function parseRule(ruleString) {
    const tokens = tokenize(ruleString);
    const ast = buildAST(tokens);
    return ast;
  }
  

  function tokenize(ruleString) {
    return ruleString.match(/\(|\)|AND|OR|[a-zA-Z0-9_><=]+/g);
  }
  

  function buildAST(tokens) {
    let index = 0;
  
    function parseExpression() {
      let node = parseTerm();
      
      while (index < tokens.length && (tokens[index] === 'OR')) {
        const operator = tokens[index++];
        const right = parseTerm();
        node = new Node('operator', node, right, operator);
      }
      return node;
    }
  
    function parseTerm() {
      let node = parseFactor();
  
      while (index < tokens.length && (tokens[index] === 'AND')) {
        const operator = tokens[index++];
        const right = parseFactor();
        node = new Node('operator', node, right, operator);
      }
      return node;
    }
  
    function parseFactor() {
      if (tokens[index] === '(') {
        index++;  // skip '('
        const node = parseExpression();
        index++;  // skip ')'
        return node;
      } else {
        return new Node('operand', null, null, tokens[index++]);
      }
    }
  
    return parseExpression();
  }
  
  // Evaluate the AST against provided data
  function evaluateAST(ast, data) {
    if (ast.type === 'operand') {
      const [attribute, operator, value] = ast.value.split(/\s+/);
      return evaluateCondition(data[attribute], operator, value);
    } else if (ast.type === 'operator') {
      const leftEval = evaluateAST(ast.left, data);
      const rightEval = evaluateAST(ast.right, data);
  
      if (ast.value === 'AND') {
        return leftEval && rightEval;
      } else if (ast.value === 'OR') {
        return leftEval || rightEval;
      }
    }
  }
  
  function evaluateCondition(attributeValue, operator, value) {
    value = isNaN(value) ? value : parseFloat(value);
  
    switch (operator) {
      case '>':
        return attributeValue > value;
      case '<':
        return attributeValue < value;
      case '=':
        return attributeValue == value;
      case '>=':
        return attributeValue >= value;
      case '<=':
        return attributeValue <= value;
      default:
        return false;
    }
  }
  
  module.exports = {
    parseRule,
    evaluateAST,
  };
  