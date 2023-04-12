import { getToken } from 'next-auth/jwt'

export default async (req, res) => {
    const secret = process.env.JWT_SECRET
    const token = await getToken({ req, secret: secret })

    try {

        // const url = `https://www.patreon.com/api/oauth2/v2/campaigns/${process.env.PATREON_CAMPAIGN_ID}?include=benefits,creator,goals,tiers&fields${encodeURIComponent("[tier]")}=title,description `
        const url = `https://www.patreon.com/api/oauth2/v2/posts/81362626?fields${encodeURIComponent('[post]')}=title,content,is_paid,is_public,published_at,url,embed_data,embed_url,app_id,app_status`


        const results = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token.accessToken,
                'user-agent': 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            },
        }).then((res) => res.json())



        console.log(results)

        return res.status(200).json({
            status: "Ok",
            data: results.data
        })

    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}