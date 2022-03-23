import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'
import Card from '../../../models/Card'

auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  try {
    //@ts-ignore
    const _user = req.user
    const store = await Store.findOne({ user: _user._id })
    const { card, name } = req.body

    const new_card = new Card({
      card: card,
      name: name,
      store_id: store._id,
    })

    const saved_store = await new_card.save()

    return res.status(200).json(saved_store)
  } catch (error) {
    res.status(500).send(error)
  }
  await disconnect()
})
