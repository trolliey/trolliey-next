import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Review from '../../../models/Review'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'

// get all products
// get request
// /api/products
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  const { id } = req.query // id of the store
  const reviews = await Review.find({ store_id: id })
  let all_reviews = []

  // finding all respective ratings of each number
  const five_stars = await Review.find({ rating: 5 })
  const four_stars = await Review.find({ rating: 4 })
  const three_stars = await Review.find({ rating: 3 })
  const two_stars = await Review.find({ rating: 2 })
  const one_stars = await Review.find({ rating: 1 })

  // percentage of each rating
  const five_stars_avg = (five_stars.length / reviews.length) * 100
  const four_star_avg = (four_stars.length / reviews.length) * 100
  const three_star_avg = (three_stars.length / reviews.length) * 100
  const two_star_avg = (two_stars.length / reviews.length) * 100
  const one_star_avg = (one_stars.length / reviews.length) * 100

  const avg = await Review.aggregate([
    {
      $group: {
        _id: '_id',
        AverageRating: { $avg: '$rating' },
      },
    },
  ])

//   console.log(avg[0])

  for (let i = 0; i < reviews.length; i++) {
    const user = await Users.findOne({ _id: reviews[i].user_id })
    all_reviews.push({
      name: user.name,
      photo: user.photoURL,
      createdAt: reviews[i].createdAt,
      review: reviews[i].review,
      rating: reviews[i].rating,
    })
  }
  await disconnect()
  return res.status(200).json({
    reviews: all_reviews,
    reviews_length: reviews.length,
    four_stars_percent: four_star_avg,
    five_stars_percent: five_stars_avg,
    three_stars_percent: three_star_avg,
    two_stars_percent: two_star_avg,
    one_stars_percent: one_star_avg,
    average_rating: avg[0] ? Math.round(avg[0].AverageRating) : 0,
  })
})

export default handler
