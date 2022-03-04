import { NextApiRequest, NextApiResponse } from 'next'
import Orders from '../../../models/Order'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'

// create an order
// post request
// /api/orders
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()

    const newOrder = new Orders({
        ...req.body,
        // @ts-ignore
        user: req.user._id
    })

    const order = await newOrder.save()

    await disconnect()
    res.status(201).send(order)
})

export default auth_handler