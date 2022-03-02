import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    orderItems: {
        type: Array,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    contact_phone_number: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    paying_number: {
        type: String,
        required: true
    },
    itemsPrice: {
        type: String,
        required: true
    },
    pay_on_delivery: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    paidAt:{
        type: Date
    }
}, {
    timestamps: true
})

const Orders = mongoose.models.Order || mongoose.model('Order', orderSchema)
export default Orders