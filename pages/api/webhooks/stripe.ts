// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc()
// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = 'whsec_543f9d8e3cee208ab469a4219e9a1f6cbb09781f4357c79392ef5cdc85a5d581'

// when order is complete
const fulfillOrder = (session: any) => {
  // TODO: fill me in
  console.log('Fulfilling order', session)
}

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const payload = req.body
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Fulfill the purchase...
    fulfillOrder(session)
  }

  console.log('Got payload: ' + payload)

  res.status(200)
})

export default handler
