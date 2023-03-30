import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'

export default async (req, res) => {
    const session = await getSession({ req })
    const secret = process.env.JWT_SECRET
    const token = await getToken({ req, secret: secret })

    console.log(session);
    console.log(token)

    try {
        return res.status(200).json({
            status: "Ok",
            data: []
        })
    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}