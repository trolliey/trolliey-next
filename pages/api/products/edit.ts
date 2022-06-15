import next, { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import slugify from '../../../utils/slugify'
import Store from '../../../models/Store'
import nextConnect from 'next-connect'
import upload from '../helpers/multer'
import jwt from 'jsonwebtoken'
import cloudinary from '../helpers/cloudinary'
import fs from 'fs'

const apiRoute = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

// Returns middleware that processes multiple files sharing the same field name.
const uploadMiddleware = upload.array('theFiles')

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware)

// get all products
// get request
// /api/products
apiRoute.put(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    // check if user if logged in
    const { authorization } = req.headers
    if (authorization) {
      const token = authorization
      //@ts-ignore
      jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Login is required!' })
        } else {
          // @ts-ignore
          const _user = req.user
          const { product_id } = req.query

          if (_user) {
            //  do stuff
            let store
            let product

            try {
              await connect()
              store = await Store.findOne({ user: _user._id })
              product = await Products.findOne({ _id: product_id })
            } catch (error) {
              return res.status(500).send({ message: error })
            }
            if (!product) {
              return res.status(404).send({ message: 'No product found' })
            }
            if (store._id.toString() === product.store_id) {
              // do something
              const {
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
              //
              // const pictures = req.files

              // try {
              //   const saved_product = await Products.findOneAndUpdate(
              //     {
              //       _id: product_id,
              //     },
              //     {
              //       title: title,
              //       slug: title,
              //       description: description,
              //       currency_type: currency,
              //       price: price,
              //       discount_price: discount_price,
              //       pictures: pictures,
              //       brand: brand,
              //       countInStock: countInStock,
              //       category: category,
              //       category_slug: slugify(category),
              //       variants: variants,
              //       sku: sku,
              //       status: status,
              //       sub_category: sub_category,
              //     }
              //   )
              //   await disconnect()
              //   return res.status(200).send({
              //     message: 'Product edited successfully',
              //     product: saved_product,
              //   })
              // } catch (error) {
              //   return res
              //     .status(500)
              //     .send({ message: 'error found here --- ', error })
              // }
              console.log(req.body)
            } else {
              return res
                .status(500)
                .send({ message: 'Only owner of product is allowed to edit' })
            }
          } else {
            return res.status(400).send({ message: 'Please login first' })
          }
        }
      })
    }
  } else {
    return res.status(500).send({ message: 'Incorrect method' })
  }
})

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}

export default auth_handler
