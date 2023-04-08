import { getToken } from 'next-auth/jwt'

export default async (req, res) => {
    const secret = process.env.JWT_SECRET
    const token = await getToken({ req, secret: secret })

    // Grab query params
    const query = req.query;
    const { postId } = query;

    // Get information on a single post
    const getPost = async () => {

        const url = `https://www.patreon.com/api/oauth2/v2/posts/${postId}?fields${encodeURIComponent("[post]")}=content,title,url,embed_data,embed_url,tiers,published_at`

        const results = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token.accessToken,
                'user-agent': 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            },
        }).then((res) => res.json())

        console.log(results)

        return results.data;
    }

    try {

        const post = await getPost();

        return res.status(200).json({
            status: "Ok",
            data: post
        })

    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}