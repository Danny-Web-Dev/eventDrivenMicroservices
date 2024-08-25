const express = require('express');
const { createUser, getUser, updateUser, loginUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

router.post('/users', createUser);
router.get('/get/:id', authenticateToken, getUser);
router.put('/users/:id', authenticateToken, updateUser);
router.post('/login', loginUser);

module.exports = router;
