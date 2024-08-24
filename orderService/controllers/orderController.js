const Order = require('../models/order');
const nats = require('nats').connect({ url: 'nats://localhost:4222' });

exports.createOrder = async (req, res) => {
	try {
		const order = await Order.create(req.body);

		// Publish 'Order Placed' event
		nats.publish('order:placed', JSON.stringify({ id: order.id, userId: order.userId, productId: order.productId }));

		res.status(201).json(order);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

exports.cancelOrder = async (req, res) => {
	console.log('hello');
	try {
		const order = await Order.findByPk(req.params.id);
		if (order) {
			order.status = 'cancelled';
			await order.save();

			// Publish 'Order Cancelled' event
			nats.publish('order:cancelled', JSON.stringify({ id: order.id }));

			res.status(200).json(order);
		} else {
			res.status(404).json({ error: 'Order not found' });
		}
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
