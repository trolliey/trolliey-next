import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Products from '../../../models/Product'
const handler = nc()
import {connect, disconnect} from '../../../utils/mongo'

// get all products
// get request
// /api/products
handler.get(async(req:NextApiRequest, res:NextApiResponse)=>{
    await connect()
    const products  = await Products.find({})
    await disconnect()
    res.send(products)
})

export default handler