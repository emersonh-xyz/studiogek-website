import fetchUserTier from '@/utils/fetch_user_tier';
import clientPromise from '../../../../lib/mongodb'
import getTierObject from '@/utils/server/getTierObject'
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

// Hard coded release date to 3 days
const UNCUT_RELEASE_TIME = 259200000;

export default async function handler(req, res) {


    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })
    const session = await getSession()

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const id = req.query.id

    try {

        // Get current tier of the post
        let post = await db.collection('posts').find({ url: id }).toArray();
        const postTier = post[0].tier;
        const postId = post[0]._id;


        // Get the post following this one
        const nextPost = await db.collection('posts').find({ _id: { $gt: postId } }).sort({ _id: 1 }).limit(1).toArray();

        if (nextPost) {
            post = { ...post, nextPost: nextPost[0]?.url };
        } else {
            post = { ...post, nextPost: null };
        }


        // Grab user tier
        const userTier = await getTierObject(token);

        // console.log(`DEBUG: \n
        // Uncut Ready: ${isUncutReleased(post[0].timestamp)}\n
        // User Tier: ${userTier.id}\n
        // Post Info: ${postTier.id}`
        // )

        // Check if the tier matches the post tier, then send post back
        if (userTier.weight >= postTier.weight) {
            console.log('hi', post.nextPost);
            res.status(200).json({ data: post, status: 200 })
            return;
        }


        // Authorize if uncut has released and our user is an uncut tier!!
        if (userTier.id === "9384741" && isUncutReleased(post[0].timestamp)) {
            res.status(200).json({ data: post, status: 200 })
            return;
        }

        // Not authorized
        res.status(401).json({ message: "Unauthorized tier", data: { tier: postTier.display, unlockDate: post[0].uncutUnlockDate }, status: 401 })
        return;

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err, status: 400 })
        return;
    }

}

function isUncutReleased(postDate) {

    // Get the current timestamp
    let now = new Date();

    // Convert the provided timestamp to a Date object
    let providedTimestamp = new Date(postDate);

    // Calculate the difference in milliseconds
    let timeDifference = now.getTime() - providedTimestamp.getTime();

    // Check if time has passed
    if (timeDifference >= UNCUT_RELEASE_TIME) {
        return true;
    } else {
        return false;
    }
}