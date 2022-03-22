import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    store_id: {
      type: String,
      required: 'Store not provided',
    },
    user_id: {
      type: String,
      required: 'User not provided',
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)
export default Review
