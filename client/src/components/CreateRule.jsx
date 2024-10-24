import React, { useState } from 'react';

const CreateRule = () => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/create-rule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ruleName, ruleString }),
        });
        const data = await res.json();
        setResponse(data);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Create Rule</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Rule Name" 
                    value={ruleName} 
                    onChange={(e) => setRuleName(e.target.value)} 
                    className="border p-2 mb-2 w-full"
                    required
                />
                <textarea 
                    placeholder="Rule String" 
                    value={ruleString} 
                    onChange={(e) => setRuleString(e.target.value)} 
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default CreateRule;