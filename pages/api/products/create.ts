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
  try {
    await connect()
    //@ts-ignore
    const _user = req.user
    if (!_user) {
      return res
        .status(500)
        .send({ message: 'Please login to your account again!' })
    } else {
      const store = await Store.findOne({ user: _user._id })
      if (store) {
        if (store.approved === true) {
          // coming from client request
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

          if (
            !pictures ||
            !description ||
            !title ||
            !category ||
            !price ||
            !currency
          ) {
            return res
              .status(500)
              .send({ message: 'Please enter all required fields' })
          } else {
            // using mongoose schema
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

            // saving the new product
            try {
              await newProduct.save()
              await disconnect()
              return res
                .status(200)
                .send({ message: 'Product saved Successfully' })
            } catch (error) {
              await disconnect()
              return res.status(500).send({ message: error })
            }
          }
        } else {
          return res.status(500).send({
            message: 'Could not verify store. Please logout then login again!',
          })
        }
      } else {
        return res.status(500).send({ message: 'No store found' })
      }
    }
  } catch (error) {
    return res.send({ message: error })
  }
})

export default auth_handler
