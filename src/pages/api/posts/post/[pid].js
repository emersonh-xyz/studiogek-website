import clientPromise from '../../../../lib/mongodb'

const handler = async (req, res) => {
    const client = await clientPromise
    const db = client.db("studiogek_website")


    try {
        const posts = await db.collection('posts').find({ title: { $regex: '' } })
        res.status(200).json(posts)
    } catch (err) {
        res.status(400).json(err)
    }



}

export default handler