import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'
import Card from '../../../models/Card'

// addd and eit a store
// put request
// /api/cards
auth_handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    //@ts-ignore
    const _user = req.user
    const { card, name, number, currency_type } = req.body
    const store = await Store.findOne({
      user: _user._id,
      currency_type: currency_type,
    })

    if (currency_type === 'RTGS') {
      await Card.findOneAndUpdate(
        { user: _user._id, currency_type: currency_type },
        { number: number, name: name, store_id: store._id }
      )
    }

    if (currency_type === 'USD') {
      await Card.findOneAndUpdate(
        { user: _user._id, currency_type: currency_type },
        { number: number, name: name, store_id: store._id }
      )
    }

    return res.status(200).send('Store Cards Updated')
    await disconnect()
  } catch (error) {
    res.status(500).send(error)
  }
})

// get all store cards
// get request
// /api/cards
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    //@ts-ignore
    const _user = req.user
    const store = await Store.findOne({
      user: _user._id,
    })

    const store_cards = await Card.find({store_id: store._id})

    return res.status(200).send(store_cards)
    await disconnect()
  } catch (error) {
    return res.status(500).send(error)
  }
})

export default auth_handler
