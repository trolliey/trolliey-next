import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    card: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    store_id:{
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
)

const Card = mongoose.models.Order || mongoose.model('Card', cardSchema)
export default Card
