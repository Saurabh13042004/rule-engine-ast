const db = require('./config/db');

async function testConnection() {
    try {
        await db.query('SELECT NOW()');
        console.log('Database connection successful');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

testConnection();
