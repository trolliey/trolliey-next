import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'

// get all products
// get request
// /api/products
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const product = await Products.findById(req.query.id)
    await disconnect()
    res.send(product)
})

export default handler