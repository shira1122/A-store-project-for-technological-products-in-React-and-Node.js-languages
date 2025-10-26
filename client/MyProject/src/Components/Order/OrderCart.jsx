import React from 'react';
import { useCart } from '../Order/CartContext';
import axios from 'axios';
import { useSelector } from 'react-redux';

function OrderCart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const user = useSelector((state) => state.user.userInfo);

  const handleOrder = async () => {
    if (!user) {
      alert('יש להתחבר כדי לבצע הזמנה');
      return;
    }

    try {
      const newOrder = {
        userId: user.id,
        items: cart,
        total,
        date: new Date().toISOString(),
      };
      await axios.post('http://localhost:4000/api/orders', newOrder);
      alert('ההזמנה נשלחה בהצלחה!');
      clearCart();
    } catch (err) {
      alert('שגיאה בשליחת ההזמנה');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>עגלת קניות</h2>
      {cart.length === 0 ? (
        <p>אין מוצרים בעגלה</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3>{item.name}</h3>
              <p>כמות: {item.qty}</p>
              <p>סה״כ: ₪{item.price * item.qty}</p>
              <button onClick={() => removeFromCart(item.id)} style={{ backgroundColor: '#e53935', color: '#fff', padding: '5px 10px', border: 'none', borderRadius: '4px' }}>
                הסר
              </button>
            </div>
          ))}
          <hr />
          <h3 style={{ marginTop: '15px' }}>סכום כולל להזמנה: ₪{total}</h3>
          <button onClick={handleOrder} style={{ backgroundColor: '#4caf50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', marginTop: '10px' }}>
            בצע הזמנה
          </button>
        </>
      )}
    </div>
  );
}

export default OrderCart;