import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCategory from '../product/ProductCategories';
import { useCart } from './CartContext';
import OrderCart from './OrderCart';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByEmail } from './OrderSlice';
import PreviousOrders from './PreviousOrders';

function Orders() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPreviousOrders, setShowPreviousOrders] = useState(false);

  const { addToCart } = useCart();
  const userEmail = useSelector(state => state.user.userInfo?.email);
  const dispatch = useDispatch();

  const orders = useSelector(state => state.order.list);
  const ordersLoading = useSelector(state => state.order.loading);
  const ordersError = useSelector(state => state.order.error);

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

  const handleTogglePreviousOrders = () => {
    setShowPreviousOrders(prev => !prev);
  };

  useEffect(() => {
    if (showPreviousOrders && userEmail) {
      dispatch(fetchOrdersByEmail(userEmail));
    }
  }, [showPreviousOrders, userEmail, dispatch]);

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div style={{ padding: '20px' }}>
      <h2>קטגוריות</h2>
      <ProductCategory onSelect={setSelectedCategory} />

      <h3 style={{ marginTop: '20px' }}>מוצרים:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filtered.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', width: '200px' }}>
            <h4>{product.name}</h4>
            <p>מחיר: {product.price} ₪</p>
            <button onClick={() => addToCart(product)} style={{ marginTop: '10px' }}>הוסף לעגלה</button>
          </div>
        ))}
      </div>

      <button
        onClick={handleTogglePreviousOrders}
        style={{ marginTop: '30px' }}
      >
        {showPreviousOrders ? 'הסתר הזמנות קודמות' : 'הצג הזמנות קודמות'}
      </button>

      {showPreviousOrders && (
        <div style={{ marginTop: '20px' }}>
          {ordersLoading && <p>טוען הזמנות קודמות...</p>}
          {ordersError && <p style={{ color: 'red' }}>{ordersError}</p>}
          {!ordersLoading && !ordersError && <PreviousOrders orders={orders} />}
        </div>
      )}

      <hr style={{ marginTop: '30px' }} />
      <OrderCart />
    </div>
  );
}

export default Orders;
