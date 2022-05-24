import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'
import Store from '../../../models/Store'

// get all user products
// get request
// /api/dashboard/products
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // for pagination
  const resultsPerPage = 8
  //@ts-ignore
  let page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1
  page = page - 1

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
        .sort({ createdAt: 'asc' })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)

      await disconnect()
      res.status(200).send(products)
    } else {
      const products = await Products.find({
        store_id: store._id,
      })
        .sort({ createdAt: 'asc' })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)
      await disconnect()
      res.status(200).send(products)
    }
  } catch (error) {
    return res.send(error)
  }
})

export default auth_handler
