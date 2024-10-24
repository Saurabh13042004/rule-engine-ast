import React, { useState } from 'react';

const CombineRules = () => {
    const [rules, setRules] = useState([]);
    const [operator, setOperator] = useState('AND');
    const [response, setResponse] = useState(null);

    const handleAddRule = () => {
        setRules([...rules, '']);
    };

    const handleChangeRule = (index, value) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/combine-rules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ rules, operator }),
        });
        const data = await res.json();
        setResponse(data);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Combine Rules</h2>
            <form onSubmit={handleSubmit}>
                {rules.map((rule, index) => (
                    <input 
                        key={index} 
                        type="text" 
                        value={rule}
                        onChange={(e) => handleChangeRule(index, e.target.value)}
                        placeholder={`Rule ${index + 1}`} 
                        className="border p-2 mb-2 w-full"
                        required
                    />
                ))}
                <button type="button" onClick={handleAddRule} className="bg-gray-300 p-2">Add Rule</button>
                <select value={operator} onChange={(e) => setOperator(e.target.value)} className="border p-2 mb-2">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2">Combine</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default CombineRules;