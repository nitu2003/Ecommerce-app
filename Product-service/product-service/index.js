const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sonikumari070300:product123@cluster0.ee0mg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});
const Product = mongoose.model('Product', productSchema);

// Add a new product
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Get all products
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Listen on port 3002
app.listen(3002, () => {
  console.log('Product Service running on port 3002');
});
