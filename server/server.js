const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./router/user');
const productRouter = require('./router/product');
const orderRouter = require('./router/order');
const cors = require('cors');

const PORT = 4000;

// הגדרת CORS פעם אחת, עם שני האוריג'ינים הרלוונטיים
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5179'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// אפשר קבלת JSON בבקשות
app.use(express.json());

// ראוטים של ה-API
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// שרת את קבצי ה-React
app.use(express.static(path.join(__dirname, 'client/dist')));

// טיפול בכל נתיב אחר – שלח את index.html של React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
