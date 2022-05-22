import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'

// get all products
// get request
// /api/products
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  if (req.body.query) {
    const queryString = req.body.query
    const queryStrings = queryString.split(' ')
    let allQueries: any = []

    queryStrings.forEach((element: any) => {
      let regex = new RegExp(element, 'i')
      allQueries.push(
        { title: regex },
        { description: regex },
        { category: regex },
        { category_slug: regex },
      )
    })

    const products = await Products.find({ $and: [{ $or: allQueries }] })
    if (!products) {
      return res.status(400).json({ error: 'No Products found' })
    }
    await disconnect()
    return res.send(products)
  }
  const products = await Products.find({})
  await disconnect()
  res.send(products)
})

export default handler
