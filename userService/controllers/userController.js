const User = require('../models/user');
const nats = require('nats').connect({ url: 'nats://localhost:4222' });

// create user api
exports.createUser = async (req, res) => {
	try {
		// insert to DB
		const user = await User.create(req.body);

		// Publish 'User Created' event
		nats.publish('user:created', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		// return user details
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// get user api
exports.getUser = async (req, res) => {
	try {
		// fetch from DB
		const user = await User.findByPk(req.params.id);

		// if user not found, return failed to find
		if (!user) {
			let data = { failed: 'No user was found' };
			res.status(201).json(data);
			return;
		}

		// Publish 'User get' event
		nats.publish('user:get', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		// return user details
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
