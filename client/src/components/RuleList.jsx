import React from 'react';

const RuleList = ({ rules, onEvaluate }) => {
    return (
        <div>
            <h2 className="text-lg font-bold mb-2">Existing Rules</h2>
            <ul className="list-disc pl-5">
                {rules.map((rule) => (
                    <li key={rule.id} className="mb-2">
                        <span className="font-semibold">{rule.rule_name}:</span> {rule.ast}
                        <button
                            className="bg-green-500 text-white rounded ml-2 p-1"
                            onClick={() => onEvaluate(rule.id)}
                        >
                            Evaluate
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RuleList;
