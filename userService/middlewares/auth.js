require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]; // Extract token

	if (!token) {
		return res.status(403).json({ error: 'No token provided' });
	}

	const { id } = req.params;
	const decodedJwt = jwt.decode(token);

	// compare the user id requested and id that is saved in token
	if (parseInt(id) !== parseInt(decodedJwt.id)) {
		return res.status(403).json({ error: 'Forbidden: You do not have access to this user' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(401).json({ error: 'Invalid token' });
		}

		req.user = user; // Store user information in request for access in other routes
		next();
	});
};

module.exports = authenticateToken;
