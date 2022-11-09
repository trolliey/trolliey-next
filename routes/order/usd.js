const express = require('express')
const { requireUserSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// make rtgs payment
// /api/order/usd
// post request
router.post('/usd', requireUserSignIn, async (req, res, next) =>{
    try {
        
    } catch (error) {
        next(error)
    }
})

module.exports = router