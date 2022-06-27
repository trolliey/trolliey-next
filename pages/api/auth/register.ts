import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'
import bcrypt from 'bcryptjs'
import * as sgMail from '@sendgrid/mail'
import formatedHTMl from '../../../helpers/email-template'

const SENDGRID_API_KEY = process.env.SEND_GRID_API

//@ts-ignore
sgMail.setApiKey(SENDGRID_API_KEY)

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const characters =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token = ''
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length)]
}

// register user
// post route
// /api/auth/register
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  await connect()
  const { email, password, name, agreed } = req.body
  if (!agreed) {
    return res
      .status(401)
      .send({ message: 'Your have to agree to our terms and conditions' })
  } else if (!emailRegexp.test(email)) {
    return res.status(401).send({ message: 'Please enter a valid email' })
  } else if (password.length < 6) {
    return res.status(401).send({ message: 'Invalid password' })
  }
  const user = await Users.findOne({ email: email })
  const another_user = await Users.findOne({ name: name })
  if (user) {
    return res.status(500).send({ message: 'Email already registered' })
  } else if (another_user) {
    return res.status(500).send({ message: 'Username already taken' })
  } else {
    const newUser = new Users({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 12),
      confirmationCode: token,
    })

    await newUser.save()
    await disconnect()
    const msg = {
      to: email, // Change to your recipient
      from: 'trewmane@gmail.com', // Change to your verified sender
      subject: 'Email Verification',
      text: 'verify your email',
      html: formatedHTMl(
        `https://www.trolliey.com/success/verify-email/${token}`
      ),
    }
    await sgMail.send(msg)

    return res.status(200).send('Account Created')
  }
})

export default handler
