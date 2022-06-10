import { NextApiRequest, NextApiResponse } from 'next'
import auth_handler from '../../../utils/auth_handler'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// add rating to product
// pur request request
// /api/rating
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
      
    console.log(req.body.orderItems)
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
            unit_amount: item.discount_price > 0 ? (item.price*100) - (item.discount_price * 100) : (item.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        }
      }),
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    }
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create(params)
    // res.redirect(303, session.url)
    return res.status(200).send(session)
  } catch (err: any) {
    res.status(err.statusCode || 500).json(err.message)
  }
})

export default auth_handler
