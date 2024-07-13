const express = require('express');
const AuthController = require('../controller/auth');

const router = express.Router();

router.post('/sendMail', AuthController.sendEmail);


module.exports = router;
