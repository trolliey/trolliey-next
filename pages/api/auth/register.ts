import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'
import bcrypt from 'bcryptjs'

// register user
// post route
// /api/auth/register
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const { email, password, name, agreed } = req.body
    if(!agreed){
        res.status(401).send('Your have to agree to our terms and conditions')
    }
    const user = await Users.findOne({ email: email })
    
    if (user) {
        res.status(500).send('User already registered')
    }
    
    const newUser = new Users({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 12)
    })
    
    await newUser.save()
    await disconnect()

    res.status(200).send('Account Created')

})

export default handler