const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sonikumari070300:order123@cluster0.z0hph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Order schema
const orderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
});
const Order = mongoose.model('Order', orderSchema);

// Create an order
app.post('/orders', async (req, res) => {
  const { userId, products } = req.body;

  // Verify user via User Service
  const user = await axios.get(`http://localhost:3001/users/${userId}`);
  if (!user) {
    return res.status(404).send('User not found');
  }

  // Create and save the order
  const order = new Order({ userId, products });
  await order.save();
  res.status(201).json(order);
});

// Listen on port 3003
app.listen(3004, () => {
  console.log('Order Service running on port 3003');
});
