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
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    const id = req.query.user_id
    const store = await Store.findOne({ user: id })

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

      // 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

      //@ts-ignore
      const products = await Products.find({
        store_id: store._id,
        $and: [{ $or: allQueries }],
      })
      await disconnect()
      res.status(200).send(products)
    } else {
      console.log('no qury')
    }
  } catch (error) {
    return res.send(error)
  }
})

export default handler
