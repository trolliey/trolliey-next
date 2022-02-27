import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// login user
// login user
// /api/auth/login
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const { email, password } = req.body
    const user = await Users.findOne({ email: email })
    await disconnect()
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
            // @ts-ignore
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        res.send({
            token,
            _id: user._id,
            email: user.email,
            role: user.role,
            name: user.name
        })
    } else {
        res.status(401).send('Invalid email or password')
    }

})

export default handler