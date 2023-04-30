import clientPromise from '../../../../lib/mongodb'

export default async function handler(req, res) {

    const client = await clientPromise
    const db = client.db("studiogek_website")

    try {
        const tags = await db.collection('tags').find().toArray();
        res.status(200).json({ data: tags })
    } catch (err) {
        console.log(err)
        res.status(400).json({ err })
    }

}
