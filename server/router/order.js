 const express = require('express');
const router = express.Router();
const orderController = require('../controller/order');

router.get('/', orderController.getAllOrders);
router.get('/byemail', orderController.getOrdersByEmail);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
