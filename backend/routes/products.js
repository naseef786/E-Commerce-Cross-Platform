const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products (any logged-in user)
router.get('/', auth(), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add product (admin only)
router.post('/', auth(['admin']), async (req, res) => {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  await product.save();
  res.json(product);
});

// Update product (admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
});

// Delete product (admin only)
router.delete('/:id', auth(['admin']), async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;
