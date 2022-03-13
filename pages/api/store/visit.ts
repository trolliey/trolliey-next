import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../utils/mongo'
import Store from '../../../models/Store'
const moment = require('moment')
import auth_handler from '../../../utils/auth_handler'

auth_handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body
  //@ts-ignore
  const _user = req.user
  console.log(`${_user._id} visited the store ${id}`)
})

export default auth_handler
