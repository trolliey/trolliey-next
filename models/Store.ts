import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    business_category: {
      type: String,
      required: true,
    },
    company_website: {
      type: String,
    },
    user: {
      type: String,
    },
    banner: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
    reviews: {
      type: Array,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    about: {
      type: String,
      default: '',
    },
    // for subscriptions and payments
    balance: {
      type: Number,
      default: 0,
    },
    page_visits: {
      type: Number,
      dafault: 0,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    next_payment_date: {
      type: Date,
    },

    notification_type: {
      type: String,
      enum: ['no_notifications', 'push_notifications', 'email_notifications'],
      default: 'push_notifications',
    },
    rating: Array,
    products: Array,
    orders: Array,
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    owner_name: {
      type: String,
    },
    owner_email: {
      type: String,
    },
    unique_products: {
      type: String,
    },
    brands: {
      type: Array,
    },
    stock_handle: {
      type: String,
    },
    physical_store: {
      type: String,
    },
    store_address: {
      type: String,
      default: '',
    },
    rtgs_account: {
      type: String,
    },
    usd_account: {
      type: String,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
    amount_to_be_paid: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Store = mongoose.models.Store || mongoose.model('Store', storeSchema)
export default Store
