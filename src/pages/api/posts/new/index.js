import clientPromise from '../../../../lib/mongodb'
import slugify from 'slugify'
import { getToken } from 'next-auth/jwt'

export default async function handler(req, res) {

    const secret = process.env.NEXTAUTH_SECRET

    const token = await getToken({ req, secret });

    const client = await clientPromise
    const db = client.db("studiogek_website")
    const collection = db.collection("posts")


    const createSafeUrl = (title) => {
        // Remove all non-alphanumeric characters and convert to lowercase
        let safeTitle = slugify(title, { lower: true, strict: true });

        // Convert any non-ASCII characters to their ASCII equivalent
        safeTitle = safeTitle.replace(/\?/g, '');

        // Limit the length of the resulting string to 50 characters
        safeTitle = safeTitle.substring(0, 50);


        // Add a random 6-digit number and a hyphen to the end of the URL
        const randomNum = Math.floor(Math.random() * 900000) + 100000;
        safeTitle += `-${randomNum}`;

        // Return the safe URL route
        return safeTitle
    };

    if (req.method === "POST" && token?.role === "admin") {

        try {

            const { title, seasonNumber, episodeNumber, streamableId, tier, tag } = JSON.parse(req.body)


            const url = createSafeUrl(title)

            await collection.insertOne({
                title: title,
                url: url,
                seasonNumber: seasonNumber,
                episodeNumber: episodeNumber,
                streamableId: streamableId,
                timestamp: new Date(),
                tier: tier,
                tag: tag
            })

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                data: {
                    url: url
                }
            })

        } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            console.log(err)
            res.status(500).json({ message: 'Error inserting document', err })
        }

    } else {
        res.status(405).json({ message: "Not Allowed" });
    }
}