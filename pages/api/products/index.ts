import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
import Store from '../../../models/Store'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'

// get all all_products
// get request
// /api/all_products
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  // for pagination
  const resultsPerPage = 16
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
      const all_products = await Products.find({ $and: [{ $or: allQueries }] })
        .sort({ createdAt: 'asc' })
        .limit(resultsPerPage)
        .skip(resultsPerPage * page)

      const products = []

      if (!all_products) {
        return res.status(400).json({ error: 'No all_Products found' })
      } else {
        
        for (let i = 0; i < all_products.length; i++) {
          const store = await Store.findOne({ _id: all_products[i].store_id })
          products.push({
            title: all_products[i].title,
            description: all_products[i].description,
            rating: all_products[i].rating,
            pictures: all_products[i].pictures,
            price: all_products[i].price,
            discount_price: all_products[i].discount_price,
            category: all_products[i].category,
            countInStock: all_products[i].countInStock,
            averageRating: all_products[i].averageRating,
            _id: all_products[i]._id,
            store_id: all_products[i].store_id,
            store_verified: store.verified,
            store_approved: store.approved,
            curency_type: all_products[i].currency_type,
            brand: all_products[i].brand,
            variants: all_products[i].variants,
            times_bought: all_products[i].times_bought

          })
        }
        await disconnect()
        res.setHeader('Cache-Control', 's-maxage=10')
        return res.status(200).send(products)
      }
    } catch (error) {
      res.status(500).send({ message: error })
    }
  }
  try {
    const all_products = await Products.find({})
      .sort({ createdAt: 'asc' })
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)
    const products = []
   
    
    for (let i = 0; i < all_products.length; i++) {
      const store = await Store.findOne({ _id: all_products[i].store_id })
      products.push({
        title: all_products[i].title,
        description: all_products[i].description,
        rating: all_products[i].rating,
        pictures: all_products[i].pictures,
        price: all_products[i].price,
        discount_price: all_products[i].discount_price,
        category: all_products[i].category,
        countInStock: all_products[i].countInStock,
        averageRating: all_products[i].averageRating,
        _id: all_products[i]._id,
        store_id: all_products[i].store_id,
        store_verified: store.verified,
        store_approved: store.approved,
        curency_type: all_products[i].currency_type,
        brand: all_products[i].brand,
        variants: all_products[i].variants,
        times_bought: all_products[i].times_bought
      })
    }
    await disconnect()
    res.setHeader('Cache-Control', 's-maxage=10')
    return res.status(200).send(products)
  } catch (error) {
    return res.status(500).send({ message: error })
  }
})

export default handler
