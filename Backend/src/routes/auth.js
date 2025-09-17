const express = require('express');
const router = express.Router();
const { registerDriver, loginDriver } = require('../controllers/authController');


//POST /api/auth/driver/register
router.post('/driver/register',registerDriver);


//POST /api/auth/driver/register
router.post('/driver/login',loginDriver);


module.exports = router;