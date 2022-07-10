import mongoose from 'mongoose'

const reportsSchema = new mongoose.Schema({
    store:{
        type:String,
        required: true
    },
    total_made:{
        type: Number,
        default: 0
    },
    to_be_paid:{
        type: Number,
        default: 0
    },
    products_sold:{
        type: Number,
        default: 0
    },
    successful_orders:{
        type: [],
        default: 0
    },
    pending_orders:{
        type: Array,
        default: []
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Report', reportsSchema)