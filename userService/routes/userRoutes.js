const express = require('express');
const { createUser, getUser, updateUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.get('/get/:id', getUser);
router.put('/users/:id', updateUser);

module.exports = router;
