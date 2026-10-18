const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// In-memory data store simulating a database for Level 1
let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Smartphone', price: 800 }
];

// 1. READ: Get all products
app.get('/api/products', (req, res) => {
  res.status(200).json(products); 
});

// 2. READ: Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.status(200).json(product);
});

// 3. CREATE: Add a new product
app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name,
    price
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 4. UPDATE: Modify an existing product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const { name, price } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;

  res.status(200).json(product);
});

// 5. DELETE: Remove a product
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(productIndex, 1);
  res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});