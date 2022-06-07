import next, { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import slugify from '../../../utils/slugify'
import Store from '../../../models/Store'

// get all products
// get request
// /api/products
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const _user = req.user
  const product_id = req.body.product_id
  if (_user) {
    //  do stuff
    await connect()
    try {
      const store = await Store.findOne({ user: _user._id })
      const product = await Products.findOne({ _id: product_id })
      if (!product) {
        return res.status(404).send({ message: 'No product found' })
      }
      if (store._id.toString() === product.store_id) {
        // do something
        const {
          pictures,
          description,
          title,
          category,
          price,
          discount_price,
          brand,
          countInStock,
          status,
          sku,
          variants,
          currency,
          sub_category,
        } = req.body
        
        try {
          const saved_product = await Products.findOneAndUpdate(
            {
              _id: product_id,
            },
            {
              title: title,
              slug: title,
              description: description,
              currency_type: currency,
              price: price,
              discount_price: discount_price,
              pictures: pictures,
              brand: brand,
              countInStock: countInStock,
              category: category,
              category_slug: slugify(category),
              variants: variants,
              sku: sku,
              status: status,
              sub_category: sub_category,
            }
          )
          await disconnect()
          return res.status(200).send({
            message: 'Product edited successfully',
            product: saved_product,
          })
        } catch (error) {
          return res
            .status(500)
            .send({ message: 'error found here --- ', error })
        }
      } else {
        return res
          .status(500)
          .send({ message: 'Only owner of product is allowed to edit' })
      }
    } catch (error) {
      return res.status(500).send({ message: error })
    }
  } else {
    return res.status(400).send({ message: 'Please login first' })
  }
})

export default auth_handler
