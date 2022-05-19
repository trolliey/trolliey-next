import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
const handler = nc()

// get all user products
// get request
// /api/dashboard
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.send('Dashboard routes')
})

export default handler
