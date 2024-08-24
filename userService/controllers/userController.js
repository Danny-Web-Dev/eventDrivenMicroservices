const { User, getById } = require('../models/user');
const nats = require('nats').connect({ url: 'nats://localhost:4222' });

const createUser = async (req, res) => {
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

const getUser = async (req, res) => {
	try {
		// fetch from DB
		const user = await getById(req.params.id);

		// if user not found, return failed to find
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		// Publish 'User get' event
		nats.publish('user:get', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		// return user details
		res.status(201).json(user);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const updateUser = async (req, res) => {
	// extract data
	const { id } = req.params;
	const { name, email } = req.body;

	try {
		// Find the user by ID
		const user = await id;
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		if (email === user.email) {
			return res.status(404).json({ success: false, message: 'Email is already registered under a different user.' });
		}

		// Update user details
		if (name) {
			user.name = name;
		}
		if (email) {
			user.email = email;
		}

		// Save updated user
		await user.save();

		// Publish 'User update' event
		nats.publish('user:update', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		res.json({ success: true, message: 'User updated successfully.', user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
};

module.exports = {
	createUser,
	getUser,
	updateUser,
};
