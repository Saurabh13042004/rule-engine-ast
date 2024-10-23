// src/api.js

const API_URL = 'http://localhost:3000/api'; 

export const createRule = async (ruleName, ruleString) => {
    const response = await fetch(`${API_URL}/rules`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleName, ruleString }),
    });
    return response.json();
};

export const getRules = async () => {
    const response = await fetch(`${API_URL}/rules`);
    return response.json();
};

export const evaluateRule = async (ruleId, data) => {
    const response = await fetch(`${API_URL}/evaluate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ruleId, data }),
    });
    return response.json();
};
