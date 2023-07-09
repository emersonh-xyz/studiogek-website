import fetchUserTier from '@/utils/fetch_user_tier';
import clientPromise from '../../../../lib/mongodb'
import getTierObject from '@/utils/server/getTierObject'
import { getToken } from 'next-auth/jwt';

// Hard coded release date to 3 days
const UNCUT_RELEASE_TIME = 259200000;

export default async function handler(req, res) {


    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const id = req.query.id

    try {

        // Get current tier of the post
        let post = await db.collection('posts').find({ url: id }).toArray();
        let postTier = post[0].tier;

        // Grab user tier
        let userTier = await getTierObject(token);

        isUncutReleased(post[0].timestamp)

        // Check if the tier matches the post tier, then send post back
        if (userTier.weight >= postTier.weight) {
            res.status(200).json({ data: post, status: 200 })
            return;

            // Authorize if week passed and uncut tier 
        } else if (postTier.id === "9384773" && userTier.id === "9384741" && isUncutReleased(post.timestamp)) {
            res.status(200).json({ data: post, status: 200 })
            return;
        }
        // Not authorized
        else {
            res.status(401).json({ message: "Unauthorized tier", data: { tier: postTier.display, unlockDate: post[0].uncutUnlockDate }, status: 401 })
            return;
        }

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

    console.log(providedTimestamp)

    // Calculate the difference in milliseconds
    let timeDifference = now.getTime() - providedTimestamp.getTime();

    console.log(timeDifference)

    // Check if time has passed
    if (timeDifference >= UNCUT_RELEASE_TIME) {
        return true;
    } else {
        return false;
    }
}