const express = require('express');
const ruleRoutes = require('./routes/ruleRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());         
app.use('/api', ruleRoutes);     

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
