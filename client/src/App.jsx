import React from 'react';
import data from './treeData.json';

function renderNode(node) {
  if (node.type === 'operand') {
    return (
      <div className="ml-4 mb-2">
        <p className="text-gray-700">{node.value}</p>
      </div>
    );
  } else if (node.type === 'operator') {
    return (
      <div className="mb-4">
        <p className="font-bold text-blue-600">{node.value}</p>
        <div className="ml-6 border-l border-gray-300 pl-4">
          {node.left && renderNode(node.left)}
          {node.right && renderNode(node.right)}
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Rule  Tree Structure</h1>
      {renderNode(data)}
    </div>
  );
}

export default App;