import { getToken } from 'next-auth/jwt'

export default async (req, res) => {

    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret: secret })

    try {

        // console.log(token?.role)

        if (token?.role === "admin") {
            return res.status(200).json({
                isAdmin: true
            })
        }

        return res.status(401).json({
            isAdmin: false
        })

    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}

