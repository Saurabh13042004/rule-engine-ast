import React, { useState } from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function CreateRule() {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const res = await fetch("https://rule-engine-ast-s01d.onrender.com/api/create-rule", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ruleName, ruleString }),
        });
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error('Error creating rule:', error);
      }finally{
        setIsLoading(false);
      }
    };
  
    const handleTestData = () => {
      setRuleName('AgeAndDepartmentRule');
      setRuleString("((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)");
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Rule</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="ruleName" className="block text-sm font-medium text-gray-700">Rule Name</label>
            <input
              type="text"
              id="ruleName"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="ruleString" className="block text-sm font-medium text-gray-700">Rule String</label>
            <textarea
              id="ruleString"
              value={ruleString}
              onChange={(e) => setRuleString(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Create Rule
            </button>
            <button type="button" onClick={handleTestData} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
              Test Data
            </button>
          </div>
        </form>
        {isLoading && (
                <div className="flex justify-center mt-4">
                    <ClipLoader size={30} color="#123abc" loading={isLoading} />
                    <p className="ml-2 text-gray-600">Please wait, creating the rule...</p>
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
  
export default CreateRule;
