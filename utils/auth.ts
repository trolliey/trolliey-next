import jwt from 'jsonwebtoken'

const signToken = (user:any) => {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
        // @ts-ignore
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export { signToken }