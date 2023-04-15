import clientPromise from '../../../../../lib/mongodb'

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const tagName = req.query.tagName

    try {
        const taggedPosts = await db.collection('posts').find({ tag: tagName }).toArray();

        if (taggedPosts.length > 0) {
            res.status(200).json({ data: taggedPosts })
        } else {
            res.status(200).json({ data: "No posts" })
        }
    } catch (err) {
        res.status(400).json(err)
    }

}
