import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductTable from './component/producttable';
import ProductDetail from './component/prductdetail';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<ProductTable />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;
