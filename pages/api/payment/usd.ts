import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../models/Order'
import Products from '../../../models/Product'
import Report from '../../../models/Reports'
import Store from '../../../models/Store'
import auth_handler from '../../../utils/auth_handler'
import { disconnect } from '../../../utils/mongo'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// add rating to product
// pur request request
// /api/rating
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { collect_my_order, method, paying_number, address, city } = req.body
    const all_involved_stores = []

    const newOrder = new Orders({
      ...req.body,
      // @ts-ignore
      user: req.user._id,
      collect_my_order: collect_my_order,
      stores_involved: [],
      method: method,
      isPaid: false,
      paying_number: paying_number,
      address: address,
      city: city,
    })

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

    try {
      // save the order
      newOrder.stores_involved = all_involved_stores
      const order = await newOrder.save()
      //editing the reports schema
      for (let i = 0; i < all_involved_stores.length; i++) {
        await Report.findOneAndUpdate(
          { store: all_involved_stores[i] },
          { $push: { pending_orders: order._id } }
        )
      }
      await disconnect()

      // console.log(req.body.orderItems)
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1L91ORER0XNv5M6kZhWkOWKK' },
          { shipping_rate: 'shr_1L91Q8ER0XNv5M6kmviNyGOf' },
        ],
        line_items: req.body.orderItems.map((item: any) => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                images: [item.pictures[0]],
              },
              unit_amount:
                item.discount_price > 0
                  ? item.price * 100 - item.discount_price * 100
                  : item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        mode: 'payment',
        success_url: `${req.headers.origin}/success/order_success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params)
      // res.redirect(303, session.url)
      return res.status(200).send(session)

      // return res
      //   .status(200)
      //   .send({ order: order._id, message: 'order created successfully' })
    } catch (error) {
      return res.status(500).send({ message: error })
    }
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message)
  }
})

export default auth_handler
