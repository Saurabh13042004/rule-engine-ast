const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ruleRoutes = require('./routes/ruleRoutes');

// Middleware
app.use(bodyParser.json()); // For parsing application/json

// Mount the rule routes
app.use('/api', ruleRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
