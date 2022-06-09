import { NextApiRequest, NextApiResponse } from 'next'
import auth_handler from '../../../../utils/auth_handler'
import { connect, disconnect } from '../../../../utils/mongo'
import Users from '../../../../models/User'

// get all products
// get request
// /api/products
auth_handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    await connect()
    //@ts-ignore
    const user = await Users.findById(req.user._id)
    const user_to_send = {
        firstname: user.firstname,
        lastname:user.lastname,
        email: user.email,
        username: user.name,
        city: user.city,
        province: user.province,
        store: user.store,
        address: user.street,
        createdAt: user.createdAt,
        picture: user.photoURL

    }
    await disconnect()
    return res.status(200).json({user: user_to_send})
})

export default auth_handler