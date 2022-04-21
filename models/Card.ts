import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema(
  {
    card: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    store_id: {
      type: String,
      required: true,
    },
    currency_type: {
      type: String,
      enum: ['USD', 'RTGS'],
    },
    card_number: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

const Card = mongoose.models.Card || mongoose.model('Card', cardSchema)
export default Card
