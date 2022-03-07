import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'seller', 'admin'],
        default: 'user',
    },
    store: {
        type: String,
        default: ''
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    street: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    postal: {
        type: String,
        default: ''
    },
    confirmationCode: {
        type: String,
        default:''
    },
    resetPasswordCode:{
        type:String,
        default: ''
    }
}, {
    timestamps: true
})

const Users = mongoose.models.User || mongoose.model('User', userSchema)
export default Users