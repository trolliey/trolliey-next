const express = require('express')
const { verifyEmail } = require('../../controllers/authController')
const router = express.Router()

// verify email
// post request
// /api/v1/auth/verify
router.post('/', verifyEmail)