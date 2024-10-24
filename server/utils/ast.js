class ASTNode {
  constructor(type, value = null, left = null, right = null) {
    this.type = type; // "operator" for AND/OR, or "operand" for conditions
    this.value = value; // Value for operand nodes (e.g., condition like 'age > 30')
    this.left = left; // Left child node
    this.right = right; // Right child node for operators (AND/OR)
  }
}

const createOperandNode = (condition) => {
  return new ASTNode("operand", condition);
};

const createOperatorNode = (operator, left, right) => {
  return new ASTNode("operator", operator, left, right);
};

const serializeAST = (node) => {
  if (!node) return null;

  return {
    type: node.type,
    value: node.value,
    left: serializeAST(node.left),
    right: serializeAST(node.right),
  };
};

module.exports = {
  ASTNode,
  createOperandNode,
  createOperatorNode,
  serializeAST,
};
