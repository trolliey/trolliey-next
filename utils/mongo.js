import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
    throw new Error(
        'Please define the MONGO_URL variable inside .env.local'
    )
}