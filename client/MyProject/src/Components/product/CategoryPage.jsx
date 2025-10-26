import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductAdd from './ProductAdd';
import ProductUpdate from './ProductUpdateDelet';
import ProductCategory from './ProductCategories';
import { useSelector } from 'react-redux';

function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const user = useSelector((state) => state.user.userInfo);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/products');
      setProducts(res.data);
    } catch (err) {
      alert('שגיאה בטעינת מוצרים');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div>
      <h2>קטגוריות</h2>
      <ProductCategory onSelect={setSelectedCategory} />

      {user?.email === 'admin@email.com' && (
        <>
          <ProductAdd onAdd={fetchProducts} />
          <ProductUpdate products={filtered} onRefresh={fetchProducts} />
        </>
      )}
    </div>
  );
}

export default CategoryPage;
