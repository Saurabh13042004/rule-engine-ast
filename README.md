
# Rule Engine with Abstract Syntax Tree (AST)

This project implements a rule engine application that uses an Abstract Syntax Tree (AST) to determine user eligibility based on specific attributes such as age, department, income, and experience. It allows dynamic rule creation, modification, and evaluation based on specified conditions.



![image](https://github.com/user-attachments/assets/3069be8d-ba45-4469-aab9-b27d6542af8a)

## Features

- Dynamic Rule Creation: Supports creating rules with conditional operators (AND, OR) and operands.
- AST Representation: Uses a custom AST data structure for rule representation and evaluation.
- API Endpoints:
  - Create rules
  - Combine multiple rules
  - Evaluate user data against the rules
- Flexible Modification: Rules can be modified or combined as needed.
- Data Persistence: Rules and metadata are stored in an AWS RDS PostgreSQL instance.


## Tech Stack

**Client:** React + Vite + Tailwind CSS

**Server:** Node.js + Express

**Database** AWS RDS PostgreSQL


## Installation

## Prerequisites
- Docker (if not using Docker, see Manual Setup below)
- PostgreSQL instance on AWS RDS (or another accessible PostgreSQL database)



### Docker Setup
 
- Clone the repository:

```bash
git clone https://github.com/Saurabh13042004/weather-monitoring-system.git
cd weather-monitoring-system

```
- Navigate to the server folder:

```bash
cd server

```

- Open the docker-compose.yml file, and add your PostgreSQL credentials and connection URI:

```bash
environment:
  - PGHOST=your_postgresql_host
  - PGUSER=your_postgresql_username
  - PGPASSWORD=your_postgresql_password
  - PGDATABASE=your_postgresql_database
```

- Build and run the Docker containers:

```bash
docker-compose up --build

```
- Once the backend is up, note the server URL (e.g., http://localhost:5000). You'll use this for the frontend setup.


### Manual Setup (Without Docker)
 
- In the server folder, create an .env file:

```bash
touch .env


```
- Add the following environment variables to your .env file:

```bash
environment:
  - PGHOST=your_postgresql_host
  - PGUSER=your_postgresql_username
  - PGPASSWORD=your_postgresql_password
  - PGDATABASE=your_postgresql_database


```

- Start the backend:

```bash
npm install
npm start

```

- Once the backend is up, note the server URL for the frontend setup.

## Frontend Setup

### Note: Environment variables for the frontend are pending deployment fixes for Vercel. Once resolved, setup instructions will be updated here.

In the frontend code, in components CreateRule , Evaluate and Combine under the handleSubmit you can paste that 


