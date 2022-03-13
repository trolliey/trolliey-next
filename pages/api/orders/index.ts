import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../models/Order'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'

// create an order
// post request
// /api/orders
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()

  const newOrder = new Orders({
    ...req.body,
    // @ts-ignore
    user: req.user._id,
  })

  // saving the order
  const order = await newOrder.save()

  for (let i = 0; i < newOrder.orderItems.length; i++) {
    await Store.findOneAndUpdate(
      { _id: newOrder.orderItems[i].store_id,
        createdAt: Date.now()
      },
      {
        $push: {
          orders: {
            order_id: newOrder._id,
            items: newOrder.orderItems.filter(
              (item: any) => item.store_id === newOrder.orderItems[i].store_id
            ),
            status: 'pending',
          },
        },
      }
    )
  }

  await disconnect()
  res.status(201).send(order)
})

// get all orders
// get request
// /api/orders
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  //@ts-ignore
  const orders = await Orders.find({ user: req.user._id })

  await disconnect()
  res.status(201).send(orders)
})

export default auth_handler
