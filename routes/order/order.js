const express= require('express')
const { createAnOrder, getASingleOrder, editAnOrder, deleteAnOrder, getStoreOrders } = require('../../controllers/orderController')
const { requireUserSignIn, requireAdminSignIn, requireStoreSignIn } = require('../../middleware/require_auth')
const router = express.Router()

// create an order
// post request
// /api/order/create
router.post('/create', requireUserSignIn, createAnOrder)

// get an order
// get request
// /api/order/single/{orderId}
router.get('/single/:id', requireStoreSignIn, getASingleOrder)

// get store orders
router.get('/store', requireStoreSignIn,getStoreOrders)

// edit an order
// put request
// /api/order/edit/{orderId}
router.get('/edit/:id', requireAdminSignIn, editAnOrder)

// delete an order
// delete request
// /api/order/single/{orderId}
router.get('/delete/:id', requireAdminSignIn, deleteAnOrder)

module.exports = router