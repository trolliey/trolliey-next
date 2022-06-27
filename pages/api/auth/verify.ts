import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'
import jwt from 'jsonwebtoken'

// login user
// login user
// /api/auth/login
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connect()
    const { code } = req.query
    const _user = await Users.findOne({ confirmationCode: code })

    // check if user has registered
    if (!_user) {
      return res.status(404).send({ message: 'Account does not exist!' })
    }

    //check if user has already verified their email
    if (_user.confirmationCode === '') {
      return res
        .status(500)
        .json({ error: 'Email already verfied, Try loggin in' })
    }

    // update user doc and remove the code
    await Users.findOneAndUpdate(
      { confirmationCode: code },
      {
        emailVerified: 'active',
        confirmationCode: '',
      }
    )
    await disconnect()

    // assign token and senf back to client
    const token = jwt.sign(
      {
        _id: _user._id,
        email: _user.email,
        role: _user.role,
        name: _user.name,
      },
      // @ts-ignore
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    )
    res.send({
      token,
      _id: _user._id,
      email: _user.email,
      role: _user.role,
      name: _user.name,
    })
  } catch (error) {
    return res.status(500).send({ message: error })
  }
})

export default handler
