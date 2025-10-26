import React, { useEffect, useContext } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CartContext } from './CartContext';

function OrderFinish() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const { clearCart } = useContext(CartContext);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3); // משלוח תוך 3 ימים

  useEffect(() => {
    clearCart(); // איפוס העגלה
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate, clearCart]);

  return (
    <Box sx={{ p: 5, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: '0 auto', backgroundColor: '#e0f7fa' }}>
        <Typography variant="h4" gutterBottom color="primary">
          ההזמנה בוצעה בהצלחה!
        </Typography>
        <Typography variant="body1" gutterBottom>
          תודה {user?.name || ''} על הזמנתך. אנו מטפלים בה ברגעים אלו.
        </Typography>
        <Typography variant="body2" gutterBottom>
          ההזמנה נשמרה בפרופיל שלך וניתן לצפות בהיסטוריית ההזמנות.
        </Typography>
        <Typography variant="body2" gutterBottom>
          תאריך משוער להגעה: {deliveryDate.toLocaleDateString()}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt:2 }}>
          מעבר אוטומטי לדף הבית...
        </Typography>
      </Paper>
    </Box>
  );
}

export default OrderFinish;
