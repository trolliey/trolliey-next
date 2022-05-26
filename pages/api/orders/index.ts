import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../models/Order'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'
//@ts-ignore
import { Paynow } from 'paynow'
import Report from '../../../models/Reports'
import Products from '../../../models/Product'

// Create instance of Paynow class
let paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
)

// Set return and result urls
paynow.resultUrl = 'http://localhost:3000/payments/gateways/paynow/update'
paynow.returnUrl = 'http://localhost:3000/payments/return'

// create an order
// post request
// /api/orders
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()

  const { collect_my_order, method, paying_number } = req.body

  // steps to follow
  // - process payment .. if available
  // - descrement quantity of product
  // - increment number of times the product was bought
  // - create an array of all stores involved
  // - edit reports if order has been payed
  // - save new order
  // - edit store orders

  const all_involved_stores = []

  const newOrder = new Orders({
    ...req.body,
    // @ts-ignore
    user: req.user._id,
    collect_my_order: collect_my_order,
    stores_involved: [],
    method: method,
  })
  //@ts-ignore
  const the_store = await Store.findOne({ user_id: req.user._id })

  // decrement quantity of product
  for (let i = 0; i < newOrder.orderItems.length; i++) {
    await Products.findOneAndUpdate(
      { _id: newOrder.orderItems[i]._id },
      { $inc: { countInStock: -1 } }
    )
  }

  // create an array of all involved stores
  for (let i = 0; i < newOrder.orderItems.length; i++) {
    if (all_involved_stores.indexOf(newOrder.orderItems[i].store_id) == -1) {
      all_involved_stores.push(newOrder.orderItems[i].store_id)
    }
  }

  // increment number of times product was bought
  for (let i = 0; i < newOrder.orderItems.length; i++) {
    await Products.findOneAndUpdate(
      { _id: newOrder.orderItems[i]._id },
      { $inc: { times_bought: 1 } }
    )
  }

  // editing the store schema to increse its orders
  for (let i = 0; i < newOrder.orderItems.length; i++) {
    await Store.findOneAndUpdate(
      { _id: newOrder.orderItems[i].store_id },
      {
        $push: {
          orders: {
            order_id: newOrder._id,
            items: newOrder.orderItems.filter(
              (item: any) => item.store_id === newOrder.orderItems[i].store_id
            ),
            status: 'pending',
            createdAt: Date.now(),
          },
        },
      }
    )
  }

  // save the order
  newOrder.stores_involved = all_involved_stores
  const order = await newOrder.save()

  //editing the reports schema
  await Report.findOneAndUpdate(
    { store: the_store._id },
    { $push: { pending_orders: order._id } }
  )

  // // @ts-ignore
  //   let payment = paynow.createPayment('Invoice from trolliey', req.user.email)
  //   newOrder.orderItems.forEach((item: any) => {
  //     payment.add(item.title, item.price)
  //   })

  //   const response = await paynow.sendMobile(payment, paying_number, method);

  //   if (response && response.success) {
  //     let instructions = response.instructions
  //     let pollUrl = response.pollUrl;

  //     console.log('PollUrl', pollUrl);
  //     console.log('Instructions', instructions)
  //     let status = await paynow.pollTransaction(pollUrl);

  //     console.log('Status', status);
  //     if (status.status) {
  //         res.json({ message: 'Yay! Transaction was paid for' });
  //     }
  //     else {
  //         res.json({ error: "Why you no pay?" });
  //     }
  // }

  await disconnect()
  res.status(201).send(order)
})

// get all orders`
// get request
// /api/orders
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  //@ts-ignore
  const orders = await Orders.find({ user: req.user._id })

  await disconnect()
  res.status(201).send(orders)
})

// change order statusd
// put request
// api/orders
auth_handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()

  // change order status
  const { status, order_id } = req.body

  const order = await Orders.findOne({ _id: order_id })

  // to store all stores involed on the order
  const all_stores_involved: any = []
  const all_store_orders: any = []

  // change order status
  order.isDelivered = status === 'delivered' ? true : false

  // getting all stores involved on the order
  const stores_array = order.stores_involved

  // save new order
  await order.save()

  // edit status of order
  for (let i = 0; i < stores_array.length; i++) {
    try {
      await Store.updateOne(
        { _id: stores_array[i], 'orders.order_id': order_id },
        {
          $set: {
            'orders.$.status': status,
          },
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  await disconnect()
  return res.status(201).send('edited')
})

export default auth_handler
