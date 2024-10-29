const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ruleRoutes = require('./routes/ruleRoutes');
const cors = require('cors');

app.use(bodyParser.json()); 
app.use(cors());
app.get('/',(req,res){
  res.send("server is started")
})

app.use('/api', ruleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
