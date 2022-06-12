import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'

// get all products
// get request
// /api/products
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // for pagination
  const resultsPerPage = 15
  //@ts-ignore
  let page = parseInt(req.query.page) >= 1 ? parseInt(req.query.page) : 1
  page = page - 1

  await connect()
  if (req.body.query) {
    const queryString = req.body.query
    const queryStrings = queryString.split(' ')
    let allQueries: any = []

    // provide regex
    queryStrings.forEach((element: any) => {
      let regex = new RegExp(element, 'i')
      allQueries.push(
        { title: regex },
        { description: regex },
        { category: regex },
        { category_slug: regex }
      )
    })

    try {
      const products = await Products.find({ $and: [{ $or: allQueries }] })
        .sort({ createdAt: 'asc' })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)

      await disconnect()

      if (!products) {
        return res.status(400).json({ error: 'No Products found' })
      }

      else{
        res.setHeader('Cache-Control', 's-maxage=10'); 
        return res.status(200).send(products)
      }
    } catch (error) {
      res.status(500).send({ message: error })
    }
  }
  try {
    const products = await Products.find({})
      .sort({ createdAt: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
    await disconnect()
    res.setHeader('Cache-Control', 's-maxage=10'); 
    return res.status(200).send(products)
  } catch (error) {
    return res.status(500).send({ message: error })
  }
})

export default handler
