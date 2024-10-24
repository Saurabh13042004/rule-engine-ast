// utils/parser.js

const { createOperatorNode, createOperandNode } = require('./ast');

const parseRuleString = (ruleString) => {
    const operators = ['AND', 'OR'];
    const tokens = ruleString.match(/(\(|\)|AND|OR|[^\s()]+)/g);
    const stack = [];

    tokens.forEach(token => {
        if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            const subExpr = [];
            while (stack.length && stack[stack.length - 1] !== '(') {
                subExpr.unshift(stack.pop());
            }
            stack.pop(); // Remove '('
            // Process the sub-expression recursively
            stack.push(parseRuleString(subExpr.join(' ')));
        } else if (operators.includes(token)) {
            const right = stack.pop();
            const left = stack.pop();
            stack.push(createOperatorNode(token, left, right));
        } else {
            stack.push(createOperandNode(token)); // Push complete condition
        }
    });

    return stack[0]; // The root of the AST
};

const combineRules = (astArray, operator = 'AND') => {
    if (astArray.length === 1) return astArray[0];

    let combinedAST = astArray[0];
    for (let i = 1; i < astArray.length; i++) {
        combinedAST = createOperatorNode(operator, combinedAST, astArray[i]);
    }
    return combinedAST;
};

const evaluateAST = (node, data) => {
    if (node.type === 'operator') {
        const leftEval = evaluateAST(node.left, data);
        const rightEval = evaluateAST(node.right, data);

        if (node.value === 'AND') {
            return leftEval && rightEval;
        } else if (node.value === 'OR') {
            return leftEval || rightEval;
        }
    } else if (node.type === 'operand') {
        const [field, operator, value] = node.value.split(' ');

        // Handle different types of comparisons
        if (operator === '>') return data[field] > parseFloat(value);
        if (operator === '<') return data[field] < parseFloat(value);
        if (operator === '=') return data[field] === value;

        return false;
    }
};

module.exports = {
    parseRuleString,
    combineRules,
    evaluateAST,
};