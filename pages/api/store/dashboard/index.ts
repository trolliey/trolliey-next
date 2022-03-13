import { NextApiRequest, NextApiResponse } from "next"
import Products from "../../../../models/Product"
import Store from "../../../../models/Store"
import { connect, disconnect } from "../../../../utils/mongo"
import auth_handler from '../../../../utils/auth_handler'

// get store products and an orders
// post request
// /api/orders
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()

    //@ts-ignore
    const _user = req.user
    const store = await Store.findOne({ user: _user._id })
    const store_products = await Products.find({store_id: store._id})

    await disconnect()
    return res.status(200).json({store, store_products})
})

export default auth_handler