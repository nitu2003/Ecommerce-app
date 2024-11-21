const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/register', (req, res) => {
    axios.post('http://localhost:3001/register', req.body).then((response) => {
      res.json(response.data);
    });
  });
  
  app.get('/products', (req, res) => {
    axios.get('http://localhost:3002/products').then((response) => {
      res.json(response.data);
    });
  });
  
  // Listen on port 3000 (Gateway)
  const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});