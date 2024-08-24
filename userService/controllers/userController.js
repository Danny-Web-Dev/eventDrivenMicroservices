const User = require('../models/user');
const nats = require('nats').connect({ url: 'nats://localhost:4222' });

exports.createUser = async (req, res) => {
	try {
		const user = await User.create(req.body);

		// Publish 'User Created' event
		nats.publish('user:created', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
