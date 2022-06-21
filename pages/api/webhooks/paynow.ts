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
    console.log(res)
  // Return a response to acknowledge receipt of the event
  return res.json({ received: true })
}
