import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Orders from '../../../models/Order'
import {connect, disconnect} from '../../../utils/mongo'
import { onError } from '../../../utils/error'
import { isAuth } from '../../../utils/auth'

const handler = nc({
    onError
})

handler.use(isAuth)

// get all products
// get request
// /api/products
handler.get(async(req:NextApiRequest, res:NextApiResponse)=>{
    await connect()
    
    const newOrder = new Orders({
        ...req.body,
        // @ts-ignore
        user: req.user._id
    }) 

    const order = await newOrder.save()

    await disconnect()
    res.status(201).send(order)
})

export default handler