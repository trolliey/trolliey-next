import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import nc from 'next-connect'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'

// add rating to product
// pur request request
// /api/rating
handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const product = await Products.findOne({})

    console.log('product rating')
    
    await disconnect()
})

export default handler