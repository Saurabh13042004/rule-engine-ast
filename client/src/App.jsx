import React, { useEffect, useState } from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import { getRules, evaluateRule } from './api';

const App = () => {
    const [rules, setRules] = useState([]);

    const fetchRules = async () => {
        const fetchedRules = await getRules();
        setRules(fetchedRules);
    };

    const handleRuleCreated = (newRule) => {
        setRules((prevRules) => [...prevRules, newRule]);
    };

    const handleEvaluate = async (ruleId) => {
        const data = { age: 32, location: 'NY' }; 
        const result = await evaluateRule(ruleId, data);
        alert(`Evaluation Result: ${result}`);
    };

    useEffect(() => {
        fetchRules();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Rule Engine</h1>
            <RuleForm onRuleCreated={handleRuleCreated} />
            <RuleList rules={rules} onEvaluate={handleEvaluate} />
        </div>
    );
};

export default App;
