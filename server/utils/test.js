// test.js

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

// Function to serialize the AST into JSON format
const serializeAST = (node) => {
    if (!node) return null;

    return {
        type: node.type,
        value: node.value,
        left: serializeAST(node.left),  // Recursively serialize the left child
        right: serializeAST(node.right)  // Recursively serialize the right child
    };
};

const main = () => {
    // Example conditions based on the provided rule string
    const condition1 = createOperandNode("age > 30");
    const condition2 = createOperandNode("department = 'Sales'");
    const condition3 = createOperandNode("age < 25");
    const condition4 = createOperandNode("department = 'Marketing'");
    const condition5 = createOperandNode("salary > 50000");
    const condition6 = createOperandNode("experience > 5");

    // Creating operator nodes for the left side of the main AND
    const andNode1 = createOperatorNode("AND", condition1, condition2);
    const andNode2 = createOperatorNode("AND", condition3, condition4);
    const orNode1 = createOperatorNode("OR", andNode1, andNode2);
    
    // Creating operator nodes for the right side of the main AND
    const orNode2 = createOperatorNode("OR", condition5, condition6);
    
    // Final root node combining both parts with AND
    const rootNode = createOperatorNode("AND", orNode1, orNode2);

    // Serialize the AST to JSON format
    const jsonAST = serializeAST(rootNode);

    // Log the serialized AST
    console.log(JSON.stringify(jsonAST, null, 2)); // Pretty-print the JSON
};

// Run the main function
main();