const express = require('express');
const { createOrder, cancelOrder, getOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', createOrder);
router.post('/orders/cancel/:id', cancelOrder);
router.get('/orders/:id', getOrder);

module.exports = router;
