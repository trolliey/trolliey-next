import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import auth_handler from '../../../utils/auth_handler'

// edit store info
auth_handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
   try {
       await connect()

       await disconnect()
   } catch (error) {
       return res.status(500).send({message: error})
   }
  })