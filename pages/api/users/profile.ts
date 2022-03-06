import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import Users from '../../../models/User'
import auth_handler from '../../../utils/auth_handler'
import { connect, disconnect } from '../../../utils/mongo'
import bcrypt from 'bcryptjs'

// update user info
// put route
// /api/users/profile
auth_handler.put(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    const { email, password, name, first_name, last_name, country, address, city, province } = req.body
    //@ts-ignore
    const user = await Users.findOne({ _id: req.user._id })
    user.name = name ? name : user.name
    user.firstname = first_name
    user.lastname = last_name
    user.province = province
    user.city = city
    user.street =  address
    user.email = email ? email : user.email
    user.country = country
    user.password = password ? bcrypt.hashSync(password) : user.password
    await user.save()

    await disconnect()

    res.status(200).send('Account Edited')

})

export default auth_handler