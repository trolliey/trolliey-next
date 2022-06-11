// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'

export const config = {
  api: {
    bodyParser: false,
  },
}

// Find your endpoint's secret in your Dashboard's webhook settings
// const endpointSecret = 'whsec_543f9d8e3cee208ab469a4219e9a1f6cbb09781f4357c79392ef5cdc85a5d581'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Payment intent')

  let event

  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature']
    const buf = await buffer(req)
    console.log(signature)
    try {
      event = stripe.webhooks.constructEvent(
        buf,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err: any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message)
      return res.status(400)
    }
  }

  console.log(event.type)

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!')
      break
    case 'payment_intent.created':
      const paymentIntentCreated = event.data.object
      console.log('Payment intent was created!')
      break
    case 'payment_method.attached':
      const paymentMethod = event.data.object
      console.log('PaymentMethod was attached to a Customer!')
      break
    case 'payment_method.completed':
      const paymentCompleted = event.data.object
      // TODO do stuff to orders item
      console.log('PaymentMethod was attached to a Customer!')
      break
    case 'checkout.session.completed':
      const checkoutComplete = event.data.object
      // TODO do stuff to orders item
      console.log('Checkout was completed!')
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }
  // Return a response to acknowledge receipt of the event
  return res.json({ received: true })
}
