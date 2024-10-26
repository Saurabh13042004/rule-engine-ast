import React, { useState } from 'react';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRule';
import EvaluateRule from './components/EvaluateRule';

function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Rule Engine Application</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreateRule />
        <CombineRules />
        <EvaluateRule />
      </div>
    </div>
  );
}





export default App;