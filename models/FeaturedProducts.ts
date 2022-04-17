import mongoose from 'mongoose'

const featuredSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const Featured =
  mongoose.models.Featured || mongoose.model('Featured', featuredSchema)
export default Featured
