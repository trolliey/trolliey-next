import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect';

const signToken = (user: any) => {
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

export interface NextApiRequestExtended extends NextApiRequest {
    userId: number | null;
    username: string | null;
    user?: any
}

function getHandler() {
    return nextConnect<NextApiRequestExtended, NextApiResponse>({
        onError(error, req, res) {
            res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
        },
        onNoMatch(req, res) {
            res.status(405).json({ error: `Method ${req.method} Not Allowed` });
        },
    }).use((req, res, next) => {
        req.userId = null;
        req.username = null;

        const { authorization } = req.headers;

        if (!authorization) {
            next();
        } else {
            jwt.verify(authorization.slice(7, authorization.length), (error: any, decoded: any) => {
                if (!error && decoded) {
                    req.user = decoded;
                    req.username = decoded.name;
                }

                next();
            });
        }
    })
};

const isAuth = async (req: any, res: any, next: any) => {
    const { authorization } = req.headers
    console.log(authorization)
    // if (authorization) {
    //     const token = authorization.slice(7, authorization.length)
    //     //@ts-ignore
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    //         if (err) {
    //             res.status(401).send({ message: 'Login is required!' })
    //         } else {
    //             req.user = decode
    //             next()
    //         }
    //     })
    // } else {
    //     res.status(401).send({ message: 'Token not supplied, Try loggin in' })
    //     next()
    // }
}

export { signToken, isAuth, getHandler }