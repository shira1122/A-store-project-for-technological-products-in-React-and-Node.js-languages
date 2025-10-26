import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersByEmail } from './OrderSlice';

const PreviousOrders = () => {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.order);
  const userEmail = useSelector((state) => state.user.userInfo?.email);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchOrdersByEmail(userEmail));
    }
  }, [dispatch, userEmail]);

  if (loading) return <p>טוען הזמנות קודמות...</p>;
  if (error) return <p style={{ color: 'red' }}>שגיאה בהצגת הזמנות קודמות</p>;
  if (orders.length === 0) return <p>לא נמצאו הזמנות קודמות</p>;

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>הזמנות קודמות</h3>
      {orders.map((order) => (
        <div key={order.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
          <p><strong>מספר הזמנה:</strong> {order.id}</p>
          <p><strong>מוצרים:</strong></p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - {item.qty || item.quantity} יח'
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PreviousOrders;
