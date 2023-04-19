import { getToken } from 'next-auth/jwt'
import getTierObject from '@/utils/server/getTierObject'

export default async (req, res) => {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })


    try {

        const tier = await getTierObject(token);

        return res.status(200).json({
            status: "Ok",
            data: tier
        })

    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}

