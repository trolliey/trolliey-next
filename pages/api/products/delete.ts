import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'

// get all products
// get request
// /api/products?product_id=abc123
auth_handler.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    // connect database
    await connect()

    //@ts-ignore
    const _user = req.user

    // get product id from client query
    const product_id = req.query.product_id

    if (!_user) {
      return res.status(500).send({ message: 'Your need to login first' })
    }

    // check if the user has a store
    const store = await Store.findOne({ user: _user._id })

    if (store) {
      // coming from client request
      const product = await Products.findOne({ _id: product_id })
      if (product) {
        await Products.deleteOne({ _id: product_id })

        await disconnect()
        return res.send({ message: 'Product Deleted Sucessfully' })
      } else {
        return res.status(500).send({ message: 'No product with such id' })
      }
    } else {
      return res.status(500).send({ message: 'No store found' })
    }
  } catch (error) {
    return res.send({ message: error })
  }
})

export default auth_handler
