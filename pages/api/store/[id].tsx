import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import nc from 'next-connect'
import Store from '../../../models/Store'
import auth_handler from '../../../utils/auth_handler'
import Products from '../../../models/Product'

const handler = nc()

// get all store products
// get request
// /api/store/:id
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()

    console.log(req.query.id)

    const store = await Store.findOne({_id: req.query.id})
    const products = await Products.find({store_id: req.query.id})

    await disconnect() 

    // get single store info and its products
   return res.send({store, products})

})

export default handler