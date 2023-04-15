import clientPromise from '../../../../lib/mongodb'

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const id = req.query.id

    try {
        const post = await db.collection('posts').find({ safeTitle: id }).toArray();
        res.status(200).json({ post })
    } catch (err) {
        res.status(400).json(err)
    }

}
