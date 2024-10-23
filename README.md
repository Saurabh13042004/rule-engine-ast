# Rule Engine Application

This project is a simple rule engine application that determines user eligibility based on various attributes (like age, department, income, spend, etc.) using a Rule Engine with an Abstract Syntax Tree (AST). The application consists of a backend built with Node.js and PostgreSQL, and a frontend built with React, Vite, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create and manage eligibility rules using a user-friendly interface.
- Evaluate rules against user attributes to determine eligibility.
- Dynamic creation and modification of rules using an Abstract Syntax Tree (AST).
- Responsive design using Tailwind CSS.

## Technologies

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, PostgreSQL
- **Database:** PostgreSQL

## Installation

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/rule-engine.git
   cd rule-engine/server
2. **Install dependencies:**

   ```bash
    npm install

3. **Create a .env file in the server folder with the following content:**
   ```bash
    DATABASE_URL=your_postgres_connection_string

4. **Run the backend server:**

   ```bash
    npm start


### Frontend Setup
1. **Navigate to the frontend folder:**

   ```bash
    cd ../frontend

2. **Install dependencies:**
   ```bash
    npm install

3. **Run the frontend development server:**

    ```bash
    npm run dev

4. **Open your browser and visit http://localhost:5173.**

Usage
Creating a Rule:

Enter a rule name and the rule string in the input fields.
Click the "Create Rule" button to save the rule.
Evaluating a Rule:

Click the "Evaluate" button next to any existing rule to evaluate it against predefined sample data.
Viewing Rules:

Existing rules will be displayed in a list format.
API Endpoints
Backend API Endpoints
POST /api/rules

Create a new rule.
Request Body: { "ruleName": "string", "ruleString": "string" }
Response: Returns the created rule object.
GET /api/rules

Retrieve all rules.
Response: Returns an array of rules.
POST /api/evaluate

Evaluate a rule against provided data.
Request Body: { "ruleId": "string", "data": { "age": number, "department": string, ... } }
Response: Returns a boolean indicating whether the user is eligible based on the rule.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature-YourFeature).
Open a pull request.
