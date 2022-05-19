import { NextApiRequest, NextApiResponse } from 'next'
import Users from '../../../models/User'
import auth_handler from '../../../utils/auth_handler'
import { connect, disconnect } from '../../../utils/mongo'

// update user info
// put route
// /api/users/profile
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  // @ts-ignore
  const _user = req.user
  if (_user.role !== 'admin') {
    return res.status(500).send({ message: 'You are not admin' })
  } else {
    await connect()
    const all_users = await Users.find({})
    disconnect()
    return res.send({ users: all_users })
  }
})

export default auth_handler
