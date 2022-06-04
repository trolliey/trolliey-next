import { NextApiRequest, NextApiResponse } from 'next'
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
  if (_user) {
    //  do stuff
    await connect()
    try {
      const store = await Store.findOne({ user: _user._id })
      if (store.approved === true) {
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

        const newProduct = new Products({
          title: title,
          slug: slugify(title),
          description: description,
          price: price,
          discount_price: discount_price,
          pictures: pictures,
          brand: brand,
          countInStock: countInStock,
          category: category,
          category_slug: slugify(category),
          variants: variants,
          store_id: store._id,
          sku: sku,
          status: status,
          currency_type: currency,
          sub_category: sub_category,
        })
        newProduct.save(function (err: any) {
          if (err) {
            console.log(err)
            return res.status(500).send({message: err})
          }

          return res
            .status(200)
            .send({ message: 'Product added successfully!' })
        })
      } else {
        return res
          .status(500)
          .send({ message: 'Store has not been approved yet' })
      }
    } catch (error) {
      res.status(500).send({ message: error })
    }
    await disconnect()
  } else {
    return res.status(400).send({ message: 'Please login first' })
  }
})

export default auth_handler
