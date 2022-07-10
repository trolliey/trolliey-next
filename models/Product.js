const mongoose = require("mongoose");

const productShema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: true,
    },
    slug: {
      type: String,
      index: true,
    },
    description: {
      type: String,
      index: true,
    },
    currency_type: {
      type: String,
      enum: ["ZWL", "USD"],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    discount_price: {
      type: Number,
      default: 0,
    },
    pictures: {
      type: Array,
    },
    brand: {
      type: String,
      default: "",
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      index: true,
    },
    category_slug: {
      type: String,
      default: "",
      index: true,
    },
    variants: {
      type: Array,
      default: [],
    },
    store_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },
    ratings: {
      type: Array,
      default: [],
    },
    sku: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "private",
    },
    times_bought: {
      type: Number,
      default: 0,
    },
    sub_category: {
      type: String,
      default: "",
    },
    time_to_deliver: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productShema);
