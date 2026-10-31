const express = require('express');
const mongoose = require('mongoose');

const freshKart = express();
const port = process.env.PORT || 3000;
const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || 'http://localhost:4200')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
);

freshKart.use((req, res, next) => {
  const origin = req.get('Origin');
  if (origin && allowedOrigins.has(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/freshkart')
  .then(() => { console.log('Connected to MongoDB successfully!'); })
  .catch((err) => { console.error('Error connecting to MongoDB!:', err); });

const productSchema = new mongoose.Schema({
  id: Number,
  img_url: String,
  price: Number,
  discount: Number,
  category: String,
  translationKey: String
});

const Product = mongoose.model('Product', productSchema, 'products');

freshKart.get('/api/get/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Could not fetch products' });
  }
});

freshKart.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
