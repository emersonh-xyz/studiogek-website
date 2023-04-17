import { getToken } from 'next-auth/jwt'

export default async (req, res) => {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })

    try {

        const url = `https://www.patreon.com/api/oauth2/v2/campaigns/9839843?include=benefits,creator,goals,tiers&fields${encodeURIComponent("[tier]")}=title,description `

        const results = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token.accessToken,
                'user-agent': 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            },
        }).then((res) => res.json())



        console.log("debug", results.data.relationships.tiers)

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