import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
function EvaluateRule() {
    const [ast, setAst] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);
    const [isLoading,setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true)
      try {
        const res = await fetch("https://rule-engine-ast-s01d.onrender.com/api/evaluate-rule", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ast: JSON.parse(ast), data: JSON.parse(data) }),
        });
        const dataResult = await res.json();
        setResult(dataResult);
      } catch (error) {
        console.error('Error evaluating rule:', error);
      } finally{
        setIsLoading(false)
      }
    };
  
    const handleTestData = () => {
      setAst(JSON.stringify({
        type: "operator",
        value: "AND",
        left: {
          type: "operand",
          value: "age > 30"
        },
        right: {
          type: "operand",
          value: 'department = "Sales"'
        }
      }, null, 2));
      setData(JSON.stringify({
        age: 35,
        department: "Sales",
        salary: 60000,
        experience: 7
      }, null, 2));
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Evaluate Rule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ast" className="block text-sm font-medium text-gray-700">AST (JSON format)</label>
            <textarea
              id="ast"
              value={ast}
              onChange={(e) => setAst(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="data" className="block text-sm font-medium text-gray-700">User Data (JSON format)</label>
            <textarea
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="2"
              required
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Evaluate Rule
            </button>
            <button type="button" onClick={handleTestData} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Test Data
            </button>
          </div>
        </form>
        {isLoading && (
                <div className="flex justify-center mt-4">
                    <ClipLoader size={30} color="#123abc" loading={isLoading} />
                    <p className="ml-2 text-gray-600">Please wait, evaluate the rule...</p>
                    <p className="ml-2 text-gray-600">Server is deployed in free instance will take a minute to give result</p>
                </div>
            )}
            {result && !isLoading && (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                    <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
      </div>
    );
  }

export default EvaluateRule;