import fetchUserTier from '@/utils/fetch_user_tier';
import clientPromise from '../../../../lib/mongodb'
import getTierObject from '@/utils/server/getTierObject'
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {


    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })

    console.log(token)

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const id = req.query.id

    try {

        // Get the current tier of the post
        let post = await db.collection('posts').find({ url: id }).toArray();
        let postTier = post[0].tier;
        // console.log(postTier)

        // Get the user tier
        let userTier = await getTierObject(token);
        // console.log("user tier:", userTier)
        // console.log("post tier:", postTier.id)


        // Check if the tier matches the post tier, if so give post
        if (userTier.weight >= postTier.weight) {
            res.status(200).json({ data: post, status: 200 })
            return;
        } else {
            res.status(401).json({ message: "Unauthorized tier", data: postTier.display, status: 401 })
            return;
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err, status: 400 })
        return;
    }


}
