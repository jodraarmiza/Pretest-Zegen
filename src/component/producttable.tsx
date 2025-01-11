import React, { useState, useEffect } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  description: string;
  thumbnail: string;
};

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await res.json();
        setProducts(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) => (filter ? product.category === filter : true));

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#000', // Black background
        color: '#fff', // White text color
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Product Dashboard</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px',
            width: '40%',
            border: '1px solid #444',
            borderRadius: '4px',
            backgroundColor: '#222', // Dark gray input background
            color: '#fff', // White text in input
          }}
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          style={{
            padding: '10px',
            border: '1px solid #444',
            borderRadius: '4px',
            backgroundColor: '#222', // Dark gray dropdown background
            color: '#fff', // White text in dropdown
          }}
        >
          <option value="">All Categories</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#111', // Dark table background
          color: '#fff', // White text color in table
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#222', color: '#fff' }}>
            <th style={{ padding: '10px', borderBottom: '1px solid #444' }}>Thumbnail</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #444' }}>Title</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #444' }}>Price</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #444' }}>Category</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #444' }}>Rating</th>
            <th style={{ padding: '10px', borderBottom: '1px solid #444' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <tr key={product.id} style={{ textAlign: 'center' }}>
              <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>{product.title}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>${product.price}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>{product.category}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>{product.rating}</td>
              <td style={{ padding: '10px', borderBottom: '1px solid #444' }}>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            padding: '10px 20px',
            margin: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: page === 1 ? '#444' : '#555',
            color: '#fff',
            border: 'none',
          }}
        >
          Previous
        </button>
        <span style={{ margin: '0 10px', color: '#fff' }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            padding: '10px 20px',
            margin: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            backgroundColor: page === totalPages ? '#444' : '#555',
            color: '#fff',
            border: 'none',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
