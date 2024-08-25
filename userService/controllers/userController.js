const User = require('../models/user');
const nats = require('nats').connect({ url: 'nats://localhost:4222' });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const createUser = async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);

		// insert to DB
		const user = await User.create(req.body);

		// Publish 'User Created' event
		nats.publish('user:created', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		// return user details
		res.status(201).json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
};

const getUser = async (req, res) => {
	try {
		// fetch from DB
		const user = await User.findByPk(req.params.id);

		// if user not found, return failed to find
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		// Publish 'User get' event
		nats.publish('user:get', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		// return user details
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
};

const updateUser = async (req, res) => {
	// extract data
	const { id } = req.params;
	const { name, email } = req.body;

	try {
		// Find the user by ID
		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found.' });
		}

		// validate changes has made
		if (email === user.email && name === user.name) {
			return res.status(404).json({ success: false, message: 'No changes made to user.' });
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

		res.json({ success: true });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error.' });
	}
};

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Check if user exists
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(404).json({ success: false, error: 'User not found' });
		}

		// Compare the password with the hashed password stored in the database
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ success: false, error: 'Invalid credentials' });
		}

		// Generate a JWT token
		const token = jwt.sign(
			{ id: user.id, email: user.email }, // Payload
			JWT_SECRET, // Secret key
			{ expiresIn: '1h' }, // Token expiry (1 hour in this example)
		);

		nats.publish('user:login', JSON.stringify({ id: user.id, name: user.name, email: user.email }));

		// Respond with the token and user information
		res.json({
			success: 'true',
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred during login' });
	}
};

module.exports = {
	createUser,
	getUser,
	updateUser,
	loginUser,
};
