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

const isAuth = async(req:any,res:any,next:any) =>{
    const {authorization} = req.headers
    if(authorization){
        const token = authorization.slice(7, authorization.length)
        //@ts-ignore
        jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
            if(err){
                res.status(401).send({message: 'Login is required!'})
            }else{
                req.user = decode
            }
        })
    }else{
        res.status(401).send({message: 'Token not supplied, Try loggin in'})
    }
}

export { signToken, isAuth }