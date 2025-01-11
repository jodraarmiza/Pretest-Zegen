const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET paginated products
app.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    // Fetch all products from the dummy API
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    if (!Array.isArray(products)) {
      throw new Error('Invalid products format from API');
    }

    // Paginate products
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + parseInt(limit));

    // Simplify the response by sending only required fields
    const simplifiedProducts = paginatedProducts.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      rating: product.rating,
      description: product.description,
      thumbnail: product.thumbnail,
    }));

    // Calculate total pages
    const totalPages = Math.ceil(products.length / limit);

    // Send paginated response
    res.status(200).json({
      data: simplifiedProducts,
      totalPages,
    });
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
