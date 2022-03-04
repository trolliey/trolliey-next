import { NextApiRequest, NextApiResponse } from 'next'
import Order from '../../../../models/Order'
import auth_handler from '../../../../utils/auth_handler'
import { connect, disconnect } from '../../../../utils/mongo'

// get all products
// get request
// /api/products
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const order = await Order.findById(req.query.id)
    console.log(order)
    await disconnect()
    return res.status(200).json({order})
})

export default auth_handler