import clientPromise from '../../../../lib/mongodb'
const handler = async (req, res) => {
    const client = await clientPromise
    const db = client.db("studiogek_website")

    try {
        const posts = await db.collection('posts')
            .find({}, { projection: { streamableId: 0 } })
            .sort({ _id: -1 })
            .limit(6)
            .toArray()
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json(err)
    }

}

export default handler