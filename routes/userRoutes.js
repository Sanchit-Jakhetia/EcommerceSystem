const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/userController');

router.get('/', getUsers); // /api/users

module.exports = router;
