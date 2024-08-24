const express = require('express');
const { createOrder, cancelOrder } = require('../controllers/orderController');

const router = express.Router();

router.post('/orders', createOrder);
router.post('/orders/:id/cancel', cancelOrder);

module.exports = router;
