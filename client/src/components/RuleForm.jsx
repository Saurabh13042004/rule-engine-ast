import React, { useState } from 'react';
import { createRule } from '../api';

const RuleForm = ({ onRuleCreated }) => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRule = await createRule(ruleName, ruleString);
        onRuleCreated(newRule);
        setRuleName('');
        setRuleString('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
                type="text"
                placeholder="Rule Name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                className="border border-gray-300 rounded p-2 mr-2"
                required
            />
            <input
                type="text"
                placeholder="Rule String"
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                className="border border-gray-300 rounded p-2 mr-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white rounded p-2">
                Create Rule
            </button>
        </form>
    );
};

export default RuleForm;
