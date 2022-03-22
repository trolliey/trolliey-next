import { NextApiRequest, NextApiResponse } from 'next'
import Products from '../../../models/Product'
import Rating from '../../../models/Rating'
import auth_handler from '../../../utils/auth_handler'
import { connect, disconnect } from '../../../utils/mongo'

// add rating to product
// pur request request
// /api/rating
auth_handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    //@ts-ignore
    const _user = req.user // the user who posted the rating
    const { id } = req.query // the id of the product
    const { rating } = req.body // the actual rating

    const product = await Products.findOne({ _id: id }) // the product being rated

    // find average rating of product from ratings document
    const avg = await Rating.aggregate([
      { $match: { product: id } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
        },
      },
    ])

    if (product) {
      // the product exists so do the rating
      let already_rated = product.rating.find(
        (element: any) => element.user === _user._id
      )
      if (already_rated) {
        // user already rated.. so just edit the original rating
        const response = await Rating.findOneAndUpdate(
          { user: _user._id, product: id },
          { rating: rating }
        )
        await Products.findOneAndUpdate(
          { _id: id },
          { averageRating: avg[0].avgRating }
        )
        return res
          .status(200)
          .json({ message: 'Product rated successfully', rating: response })
      } else {
        // rating does not exists yet .. so create the rating fitsy
        // console.log('create a new rating')
        const new_rating = new Rating({
          rating: rating,
          user: _user._id,
          product: id,
        })

        const saved_rating = await new_rating.save()
        await Products.findOneAndUpdate(
          { _id: id },
          { averageRating: avg[0].avgRating }
        )
        return res
          .status(200)
          .json({ message: 'Product rated successfully', rating: saved_rating })
      }
    }
    res.status(404).send('product does not exist')
    console.log('product rating')

    await disconnect()
  } catch (error) {
    return res.status(500).json({ error: error })
  }
})

export default auth_handler
