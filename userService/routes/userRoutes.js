const express = require('express');
const { createUser } = require('../controllers/userController');
const { getUser } = require('../controllers/userController');

const router = express.Router();

router.post('/users', createUser);
router.get('/get/:id', getUser);

module.exports = router;
