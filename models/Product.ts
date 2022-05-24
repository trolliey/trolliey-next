import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    slug: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    currency_type:{
        type: String,
        enum: ['ZWL', 'USD'],
        default: 'USD'
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
        required: true,
        index: true
    },
    category_slug:{
        type: String,
        default: '',
        index:true
    },
    variants:{
        type:Array
    },
    store_id:{
        type:String,
        default: ''
    },
    ratings: {
        type: Array,
        default: []
    },
    sku:{
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'private'
    },
    times_bought:{
        type:Number,
        default: 0
    },
    sub_category:{
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

productSchema.index({ category: 'text', description: 'text', title: 'text', owner: 'text', category_slug: 'text', slug: 'text', _id: 'text' });
const Products = mongoose.models.Product || mongoose.model('Product', productSchema)
export default Products