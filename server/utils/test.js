class ASTNode {
    constructor(type, value = null, left = null, right = null) {
        this.type = type;   // "operator" for AND/OR, or "operand" for conditions
        this.value = value; // Value for operand nodes (e.g., condition like 'age > 30')
        this.left = left;   // Left child node
        this.right = right; // Right child node for operators (AND/OR)
    }
}

// Helper to create an operand node
const createOperandNode = (condition) => {
    return new ASTNode('operand', condition);
};

// Helper to create an operator node (AND/OR)
const createOperatorNode = (operator, left, right) => {
    return new ASTNode('operator', operator, left, right);
};

// Tokenize the rule string into conditions and operators
const tokenizeRuleString = (ruleString) => {
    // Capture conditions and operators, properly handling AND and OR
    return ruleString.match(/(?:[a-zA-Z_]+\s*[><=]\s*'?\w+'?)|AND|OR/g);
};

// Parsing logic for building the AST from tokens
const parseTokens = (tokens) => {
    let index = 0;

    // Parse expressions based on operator precedence
    function parseExpression() {
        let node = parseTerm();  // Parse AND conditions first

        // OR has lower precedence, so we handle it outside the AND group
        while (index < tokens.length && tokens[index] === "OR") {
            const operator = tokens[index++];
            const right = parseTerm();  // OR joins another term
            node = createOperatorNode(operator, node, right);
        }

        return node;
    }

    // Parse terms which involve AND conditions
    function parseTerm() {
        let node = parseFactor();  // Get a single condition or factor

        // AND has higher precedence, so we nest ANDs within the same term
        while (index < tokens.length && tokens[index] === "AND") {
            const operator = tokens[index++];
            const right = parseFactor();
            node = createOperatorNode(operator, node, right);
        }

        return node;
    }

    // Parse a single condition (factor)
    function parseFactor() {
        const token = tokens[index++];
        return createOperandNode(token);  // Create operand for a condition
    }

    return parseExpression();  // Start with the highest precedence (AND first)
};

// Main function to parse a rule string into an AST
const parseRule = (ruleString) => {
    const tokens = tokenizeRuleString(ruleString);  // Tokenize the rule string
    return parseTokens(tokens);  // Build the AST from tokens
};

// Sample rule strings for testing
const ruleString1 = "age > 30 AND department = 'Sales'";
const ruleString2 = "age < 25 AND department = 'Marketing' OR experience > 5";

// Parse the rule strings
const ast1 = parseRule(ruleString1);
const ast2 = parseRule(ruleString2);

// Serialize and log the ASTs
const serializeAST = (node) => {
    if (!node) return null;
    return {
        type: node.type,
        value: node.value,
        left: serializeAST(node.left),
        right: serializeAST(node.right),
    };
};

console.log("AST for Rule 1:", JSON.stringify(serializeAST(ast1), null, 2));
console.log("AST for Rule 2:", JSON.stringify(serializeAST(ast2), null, 2));
