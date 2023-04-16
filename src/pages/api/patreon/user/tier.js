import { getToken } from 'next-auth/jwt'

export default async (req, res) => {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req, secret: secret })
    const tierList = require("../../../../config/tiers.json")

    const getTierId = async () => {

        // const url = `https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers`

        const url = `https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers`

        // const url = `https://www.patreon.com/api/oauth2/v2/identity`

        const results = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token.accessToken,
                'user-agent': 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            },
        }).then((res) => res.json())

        console.log(results.included[0].relationships.currently_entitled_tiers)

        // for (const obj of results.included) {
        //     const tier = tierList.find((tier) => tier.id === obj.id);
        //     if (tier) {
        //         return tier.id;
        //     }
        // }

        return "";
    }

    try {

        const tierId = await getTierId();


        return res.status(200).json({
            status: "Ok",
            data: tierId
        })

    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}

