import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../models/Order'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'
//@ts-ignore
import { Paynow } from 'paynow'
import Report from '../../../models/Reports'

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

  const newOrder = new Orders({
    ...req.body,
    // @ts-ignore
    user: req.user._id,
    collect_my_order: collect_my_order,
  })
  //@ts-ignore
  const the_store = await Store.findOne({ user_id: req.user._id })

  // saving the order
  const order = await newOrder.save()

  //editing the reports schema
  await Report.findOneAndUpdate(
    { store: the_store._id },
    { $push: { pending_orders: order._id } }
  )

  // @ts-ignore
    let payment = paynow.createPayment('Invoice from trolliey', req.user.email)
    newOrder.orderItems.forEach((item: any) => {
      payment.add(item.title, item.price)
    })

    const response = await paynow.sendMobile(payment, paying_number, method);

    if (response && response.success) {
      let instructions = response.instructions
      let pollUrl = response.pollUrl;

      console.log('PollUrl', pollUrl);
      console.log('Instructions', instructions)
      let status = await paynow.pollTransaction(pollUrl);

      console.log('Status', status);
      if (status.status) {
          res.json({ message: 'Yay! Transaction was paid for' });
      }
      else {
          res.json({ error: "Why you no pay?" });
      }
  }

  // editing the store schema
  for (let i = 0; i < newOrder.orderItems.length; i++) {
    await Store.findOneAndUpdate(
      { _id: newOrder.orderItems[i].store_id, createdAt: Date.now() },
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

export default auth_handler
