import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../models/Product'
import Users from '../../models/User'
import { data } from '../../utils/data'
const handler = nc()
import {connect, disconnect} from '../../utils/mongo'

// get all products
// get request
// /api/products
handler.get(async(req:NextApiRequest, res:NextApiResponse)=>{
    await connect()
    await Users.deleteMany()
    await Users.insertMany(data.users)
    await Products.deleteMany()
    await Products.insertMany(data.products)
    await disconnect()
    res.send('products inserted')
})

export default handler