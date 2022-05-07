import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'
import bcrypt from 'bcryptjs'

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// register user
// post route
// /api/auth/register
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  const { email, password, name, agreed } = req.body
  if (!agreed) {
    res
      .status(401)
      .send({ message: 'Your have to agree to our terms and conditions' })
  }
  if (!emailRegexp.test(email)) {
    res.status(401).send({ message: 'Please enter a valid email' })
  }
  if (password.length < 6) {
    res.status(401).send({ message: 'Invalid password' })
  }
  const user = await Users.findOne({ email: email })
  const another_user = await Users.findOne({ name: name })
  if (user) {
    res.status(500).send({ message: 'Email already registered' })
  }
  if (another_user) {
    res.status(500).send({ message: 'Username already taken' })
  } else {
    const newUser = new Users({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 12),
    })

    await newUser.save()
    await disconnect()

    res.status(200).send('Account Created')
  }
})

export default handler
