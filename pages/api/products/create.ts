import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import upload from '../helpers/multer'
import jwt from 'jsonwebtoken'
import { connect, disconnect } from '../../../utils/mongo'
import Store from '../../../models/Store'
import cloudinary from '../helpers/cloudinary'
import fs from 'fs'
import slugify from '../../../utils/slugify'
import Products from '../../../models/Product'

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

// Process a POST request
apiRoute.post(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // check if user if logged in
    const { authorization } = req.headers
    if (authorization) {
      const token = authorization
      //@ts-ignore
      jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (err) {
          return res.status(401).send({ message: 'Login is required!' })
        } else {
          //connect database
          await connect()
          //@ts-ignore
          const store = await Store.findOne({ user: decode._id })
          if (store.approved) {
            // get items from request body
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
              time_to_delivery
            } = req.body

            // if(!discount_price || !description || !title || !price || !status ){
            //   return res.status(400).send({message: 'Please enter required fields'})
            // }

            // upload images to cloudinary
            const uploader = async (path: any) =>
              cloudinary.upload(path, 'Images')
            const urls: any = []
            //@ts-ignore
            const files = req.files

            for (const file of files) {
              const { path } = file
              try {
                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
              } catch (error) {
                res.status(500).send({ message: `Error uploading images ${error}` })
              }
            }

            const newProduct = new Products({
              title: title,
              slug: slugify(title),
              description: description,
              price: parseFloat(price),
              discount_price: discount_price ? parseFloat(discount_price) : 0,
              pictures: urls,
              brand: brand,
              countInStock: parseInt(countInStock),
              category: category,
              category_slug: slugify(category),
              variants: variants ? variants : [],
              store_id: store._id,
              sku: sku,
              status: status,
              currency_type: currency,
              sub_category: sub_category,
              time_to_deliver: time_to_delivery,
            })

            try {
              const saved_product = await newProduct.save()
              await disconnect()
              return res
                .status(200)
                .send({
                  message: 'Product saved successfully',
                  product_id: saved_product._id,
                })
            } catch (error) {
              await disconnect()
              return res
                .status(404)
                .send({ message: 'error found here --- ', error })
            }
          } else {
            return res
              .status(403)
              .send({ message: 'Your store has not been approved yet' })
          }
        }
      })
    } else {
      return res
        .status(401)
        .send({ message: 'Token not supplied, Try loggin in' })
    }
  } else {
    return res.status(500).send({ message: 'Method not allowed' })
  }
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
