import clientPromise from '../../../../lib/mongodb'

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const id = req.query.id

    try {
        const allPosts = await db.collection('posts').find().toArray();
        res.status(200).json({ data: allPosts })
    } catch (err) {
        res.status(400).json(err)
    }

}
