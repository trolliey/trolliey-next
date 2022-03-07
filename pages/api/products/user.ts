import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import slugify from '../../../utils/slugify'
import Store from '../../../models/Store'
const handler = nc()

// get all user products
// get request
// /api/products/user?id=id_of_user
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connect()
        const id = req.query.user_id
        const store = await Store.findOne({ user: id })
        //@ts-ignore
        const products = await Products.find({ store_id: store._id })
        await disconnect()
        res.status(200).send(products)
    } catch (error) {
        return res.send(error)
    }
})

export default handler