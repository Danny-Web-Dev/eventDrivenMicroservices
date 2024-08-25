const express = require('express');
const { createUser, getUser, updateUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.get('/get/:id', getUser);
router.put('/users/:id', updateUser);
router.post('/login', loginUser);

module.exports = router;
