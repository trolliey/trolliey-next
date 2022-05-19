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
// /api/dashboard/products
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    //@ts-ignore
    const _user = req.user
    const id = req.query.user_id
    const store = await Store.findOne({ user: _user._id })

    if (req.body.query) {
      // search query on seller inventory
      const queryString = req.body.query
      const queryStrings = queryString.split(' ')
      let allQueries: any = []

      queryStrings.forEach((element: any) => {
        let regex = new RegExp(element, 'i')
        allQueries.push(
          { title: regex },
          { description: regex },
          { category: regex },
          { category_slug: regex }
        )
      })

      //@ts-ignore
      const products = await Products.find({
        store_id: store._id,
        $and: [{ $or: allQueries }],
      })
      await disconnect()
      res.status(200).send(products)
    } else {
      const products = await Products.find({
        store_id: store._id,
      })
      await disconnect()
      res.status(200).send(products)
    }
  } catch (error) {
    return res.send(error)
  }
})

export default auth_handler
