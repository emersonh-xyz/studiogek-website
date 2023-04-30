import clientPromise from '../../../../lib/mongodb'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {

    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret });

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const collection = db.collection("tags")


    if (req.method === "POST" && token?.role === "admin") {

        try {

            const { title, safeTitle, thumbnail } = JSON.parse(req.body)


            await collection.insertOne({
                title: title,
                safeTitle: safeTitle,
                thumbnail: thumbnail,
            })

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                message: "Success!"
            })

        } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ message: 'Error inserting document', err })
        }

    } else {
        res.status(405).json({ message: "Not Allowed" });
    }
}