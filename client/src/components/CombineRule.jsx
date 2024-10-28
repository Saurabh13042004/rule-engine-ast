import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
function CombineRules() {
    const [rules, setRules] = useState(['']);
    const [operator, setOperator] = useState('AND');
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  
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
      setIsLoading(true)
      try {
        const res = await fetch("https://rule-engine-ast-s01d.onrender.com/api/combine-rules", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rules, operator }),
        });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Error combining rules:', error);
      }finally{
        setIsLoading(false)
      }
    };
  
    const handleTestData = () => {
      setRules([
        "((age > 30 AND department = 'Marketing'))",
        "(salary > 20000 OR experience > 5)"

      ]);
      setOperator('AND');
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Combine Rules</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {rules.map((rule, index) => (
            <div key={index}>
              <label htmlFor={`rule${index}`} className="block text-sm font-medium text-gray-700">Rule {index + 1}</label>
              <input
                type="text"
                id={`rule${index}`}
                value={rule}
                onChange={(e) => handleChangeRule(index, e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddRule} className="text-blue-500 hover:text-blue-600 focus:outline-none">
            + Add Rule
          </button>
          <div>
            <label htmlFor="operator" className="block text-sm font-medium text-gray-700">Operator</label>
            <select
              id="operator"
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Combine Rules
            </button>
            <button type="button" onClick={handleTestData} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Test Data
            </button>
          </div>
        </form>
        {isLoading && (
                <div className="flex justify-center mt-4">
                    <ClipLoader size={30} color="#123abc" loading={isLoading} />
                    <p className="ml-2 text-gray-600">Please wait, combining the rule...</p>
                    <p className="ml-2 text-gray-600">Server is deployed in free instance will take a minute to give result</p>
                </div>
            )}
            {response && !isLoading && (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                    <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}

      </div>
    );
  }
  
export default CombineRules;