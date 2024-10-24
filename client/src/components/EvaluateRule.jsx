import React, { useState } from 'react';

const EvaluateRule = () => {
    const [ast, setAst] = useState('');
    const [data, setData] = useState({});
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/evaluate-rule`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ast: JSON.parse(ast), data }),
        });
        const dataResult = await res.json();
        setResult(dataResult);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold">Evaluate Rule</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    placeholder="AST (JSON format)" 
                    value={ast} 
                    onChange={(e) => setAst(e.target.value)} 
                    className="border p-2 mb-2 w-full"
                    required
                />
                <input 
                    type="text" 
                    placeholder='User Data (e.g., {"age": 35})' 
                    onChange={(e) => setData(JSON.parse(e.target.value))} 
                    className="border p-2 mb-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">Evaluate</button>
            </form>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
};

export default EvaluateRule;