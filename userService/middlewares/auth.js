const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Extract token

	if (!token) {
		return res.status(403).json({ error: 'No token provided' });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		req.user = user; // Store user information in request for access in other routes
		next();
	});
};

module.exports = authenticateToken;
