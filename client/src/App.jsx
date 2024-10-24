import React from 'react';

import CreateRule from './components/CreateRule';
import EvaluateRule from './components/EvaluateRule';
import CombineRules from './components/CombineRule';


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