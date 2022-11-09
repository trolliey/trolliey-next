const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      type: Array,
      required: true,
    },
    store_id:{
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    contact_phone_number: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    paying_number: {
      type: String,
    },
    itemsPrice: {
      type: String,
      required: true,
    },
    pay_on_delivery: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paidAt: {
      type: Date,
    },
    number_of_items_bought: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "delivered", "cancelled"],
      default: 'pending'
    },
    collect_my_order: {
      type: String,
      default: "false",
    },
    stores_involved: {
      type: Array,
      default: [],
    },
    weight:{
      type: Number,
      defult: 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema)
