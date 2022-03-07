import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
const handler = nc()
import { connect, disconnect } from '../../../utils/mongo'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Store from '../../../models/Store'

// login user
// login user
// /api/auth/login
handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const { email, password } = req.body
    const _user = await Users.findOne({ email: email })

    if(!_user){
        res.status(404).send({message: 'Account does not exist!'})
    }

    if(!_user.emailVerified ){
        return res.status(403).send({message: 'Please verify your email first!'})
    }

    // checking if user has a store
    const is_store = await Store.findOne({ user: _user.store, approved: true })

    if (is_store) {
        const password_correct = await bcrypt.compare(password, _user.password)
        if (password_correct) {
            const token = await jwt.sign({
                name: _user.name,
                email: _user.email,
                bio: _user.bio,
                verified: is_store.verified,
                _id: _user._id,
                role: 'seller',
                emailVerified: _user.emailVerified,
                store_id: is_store._id
                //@ts-ignore
            }, process.env.JWT_SECRET)
            if (token) {
                const user = {
                    name: _user.name,
                    email: _user.email,
                    bio: _user.bio,
                    verified: is_store.verified,
                    _id: _user._id,
                    role: 'seller',
                    emailVerified: _user.emailVerified,
                    store_id: is_store._id,
                    company_name: is_store.company_name
                }
                
                return res.send({
                    message: 'login successful',
                    token,
                    _id: user._id,
                    email: user.email,
                    role: 'seller',
                    name: user.name,
                    bio: is_store.about,
                    store_id: is_store._id,
                    company_name: is_store.company_name,
                    verified: is_store.verified,
                })
            } else {
                return res.status(422).send({ error: 'Failed to login, Wrong details!' })
            }
        } else {
            return res.status(400).send({ error: 'Wrong login details' })
        }
    }

    await disconnect()
    if (_user && bcrypt.compareSync(password, _user.password)) {
        const token = jwt.sign({
            _id: _user._id,
            email: _user.email,
            role: _user.role,
            name: _user.name
            // @ts-ignore
        }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        res.send({
            token,
            _id: _user._id,
            email: _user.email,
            role: _user.role,
            name: _user.name
        })
    } else {
        res.status(401).send('Invalid email or password')
    }

})

export default handler