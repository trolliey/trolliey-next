import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
    },
    product: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Rating = mongoose.models.Rating || mongoose.model('Rating', ratingSchema)
export default Rating
