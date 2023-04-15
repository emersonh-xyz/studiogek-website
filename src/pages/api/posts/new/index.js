import clientPromise from '../../../../lib/mongodb'
import slugify from 'slugify'

export default async function handler(req, res) {

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

        // Return the safe URL route
        return safeTitle
    };


    if (req.method === "POST") {

        try {

            const { title, streamableId, imageUrl, tier, tag } = JSON.parse(req.body)

            const safeTitle = createSafeUrl(title)


            const result = await collection.insertOne({
                title: title,
                safeTitle: safeTitle,
                streamableId: streamableId,
                imageUrl: imageUrl,
                tier: tier,
                tag: tag
            })

            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                data: {
                    url: safeTitle
                }
            })

        } catch (err) {
            console.log(err)

            res.setHeader('Content-Type', 'application/json');
            res.status(500).json({ message: 'Error inserting document', err })
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}