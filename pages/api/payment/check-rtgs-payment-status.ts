import { NextApiRequest, NextApiResponse } from 'next'
import auth_handler from '../../../utils/auth_handler'

// check if payment was successful or not
auth_handler.post(async (req:NextApiRequest, res:NextApiResponse)=>{
    try {
        console.log('check the status of the payment')
    } catch (error) {
        return res.status(500).send({message: 'Check the status of the payment'})
    }
})

export default auth_handler