import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../../models/Product'
import Store from '../../../../models/Store'
import { connect, disconnect } from '../../../../utils/mongo'
import auth_handler from '../../../../utils/auth_handler'
import Orders from '../../../../models/Order'

// get store products and an orders
// post request
// /api/orders
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()

  const all_orders: any = []

  //@ts-ignore
  const _user = req.user
  const store = await Store.findOne({ user: _user._id })

  // getting all store orders
  for (let i = 0; i < store.orders.length; i++) {
    const order = await Orders.findOne({
      _id: store.orders[i].order_id,
    })
    all_orders.push({
      createdAt: order.createdAt,
      status: order.status,
    })
  }

  // getting all store products
  const store_products = await Products.find({ store_id: store._id })

  await disconnect()
  return res.status(200).json({ store, store_products, orders: all_orders })
})

export default auth_handler
