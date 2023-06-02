import fetchUserTier from '@/utils/fetch_user_tier';
import clientPromise from '../../../../lib/mongodb'
import getTierObject from '@/utils/server/getTierObject'
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {


    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })

    // console.log(token)

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const id = req.query.id

    try {

        // Get the current tier of the post
        let post = await db.collection('posts').find({ url: id }).toArray();
        let postTier = post[0].tier;

        // Get the user tier
        let userTier = await getTierObject(token);

        // Debug statement for user and post tier
        // console.log("user tier:", userTier)
        // console.log("post tier:", postTier.id)

        // Check if the tier matches the post tier, if so send post back
        if (userTier.weight >= postTier.weight) {
            res.status(200).json({ data: post, status: 200 })
            return;

            // If post is Gek and user is Uncut and a week passed since post date 
        } else if (postTier.id === "9384773" && userTier.id === "9384741" && hasAWeekPassed(post.timestamp)) {
            res.status(200).json({ data: post, status: 200 })
            return;
        }
        else {
            res.status(401).json({ message: "Unauthorized tier", data: postTier.display, status: 401 })
            return;
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err, status: 400 })
        return;
    }


}

function hasAWeekPassed(postDate) {
    // Get the current timestamp
    var now = new Date();

    // Convert the provided timestamp to a Date object
    var providedTimestamp = new Date(postDate);

    // Calculate the difference in milliseconds
    var timeDifference = now.getTime() - providedTimestamp.getTime();

    // Define the number of milliseconds in a week
    var millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;

    // Check if a week has passed
    if (timeDifference >= millisecondsInWeek) {
        return true;
    } else {
        return false;
    }
}