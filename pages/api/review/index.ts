import auth_handler from '../../../utils/auth_handler'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import Review from '../../../models/Review'
import  nc from 'next-connect'
const handler = nc()

// create a revew
// post request
// /api/review/create
auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  //@ts-ignore
  const _user = req.user
  const { review, rating, store } = req.body
  const newReview = new Review({
    store_id: store,
    user_id: _user._id,
    rating: rating,
    review: review,
  })

  const saved_review = newReview.save()
  await disconnect()
})

//get all reviews
// get request
// /api/v1/reviews/get
handler.get(async (req:NextApiRequest, res: NextApiResponse)=>{
    await connect()

    console.log('get all requests')

    await disconnect()
})

export default auth_handler
