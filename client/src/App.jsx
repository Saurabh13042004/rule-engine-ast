import React from 'react';
import data from './treeData.json';
import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRule';

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
    <div className="container mx-auto">
    <h1 className="text-center text-3xl font-bold my-4">Rule Engine Application</h1>
    <CreateRule />
    <EvaluateRule />
    <CombineRules />
</div>
  );
}

export default App;