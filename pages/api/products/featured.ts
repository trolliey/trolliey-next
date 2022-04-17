import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import slugify from '../../../utils/slugify'
import Store from '../../../models/Store'

// create a featured product
// get request
// /api/products
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        // make product featured

    } catch (error) {
        return res.send(error)
    }
})

export default auth_handler