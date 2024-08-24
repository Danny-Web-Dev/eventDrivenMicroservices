const Order = require('../models/order');
const nats = require('nats').connect({ url: 'nats://localhost:4222' });

const createOrder = async (req, res) => {
	try {
		//insert into DB
		const order = await Order.create(req.body);

		// Publish 'Order Placed' event
		nats.publish('order:placed', JSON.stringify({ id: order.id, userId: order.userId, productId: order.productId }));

		res.status(201).json(order);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getOrder = async (req, res) => {
	try {
		const order = await Order.findByPk(req.params.id);

		if (!order) {
			return res.status(404).json({ success: false, message: 'Order not found.' });
		}

		// Publish 'Order get' Event
		nats.publish('order:get', JSON.stringify(order));

		// return order details
		res.status(201).json(order);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const cancelOrder = async (req, res) => {
	try {
		// fetch from DB
		const order = await Order.findByPk(req.params.id);

		if (!order) {
			return res.status(404).json({ success: false, message: 'Order not found.' });
		}

		// update order status to cancelled in DB
		order.status = 'cancelled';
		await order.save();

		// Publish 'Order Cancelled' event
		nats.publish('order:cancelled', JSON.stringify({ id: order.id }));

		res.status(200).json(order);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
};

module.exports = {
	createOrder,
	cancelOrder,
	getOrder,
};
