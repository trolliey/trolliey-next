import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    averageRating:{
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number
    },
    pictures: {
        type: Array,
    },
    brand:{
        type:String,
        default:''
    },
    numReviews: {
        type: Number,
        default: 0
    },
    countInStock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    category_slug:{
        type: String,
        default: ''
    },
    variants:{
        type:Array
    },
    store_id:{
        type:String,
        default: 'asdfasdlfuhlkj'
    },
    ratings: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
})

const Products = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Products