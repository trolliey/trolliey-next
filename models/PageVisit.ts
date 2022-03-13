import mongoose from 'mongoose'

const pageVisitSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const PageVisit =
  mongoose.models.Product || mongoose.model('PageVisit', pageVisitSchema)
export default PageVisit
