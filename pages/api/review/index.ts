import auth_handler from '../../../utils/auth_handler'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import Review from '../../../models/Review'
import nc from 'next-connect'
const handler = nc()

// create a revew
// post request
// /api/review/
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    //@ts-ignore
    const _user = req.user
    const { review, rating, store_id } = req.body

    if (!review || !rating) {
      return res.status(400).send('Enter all fields first!')
    }

    const newReview = new Review({
      store_id: store_id,
      user_id: _user._id,
      rating: rating,
      review: review,
    })

    try {
      await newReview.save()
      await disconnect()
      res.status(200).send('Successfully added')
    } catch (error) {
      res.status(500).send({ message: error })
    }
  } catch (error) {
    res.status(500).send(error)
  }
})

//get all reviews
// get request
// /api/v1/review
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()

  console.log('get all requests')

  await disconnect()
})

export default auth_handler
