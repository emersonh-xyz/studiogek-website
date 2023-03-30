import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import axios from 'axios'

export default async (req, res) => {
    const session = await getSession({ req })
    const secret = process.env.JWT_SECRET
    const token = await getToken({ req, secret: secret })

    try {

        const url = `https://www.patreon.com/api/oauth2/v2/identity?include=memberships.currently_entitled_tiers,memberships.campaign&fields${encodeURIComponent("[user]")}
        =email,first_name,full_name,image_url,last_name,thumb_url,url,vanity,is_email_verified&fields${encodeURIComponent("[member]")}
        =currently_entitled_amount_cents,lifetime_support_cents,campaign_lifetime_support_cents,last_charge_status,patron_status,last_charge_date,pledge_relationship_start`

        console.log(token)
        const results = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token.accessToken,
                'user-agent': 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
            },
        }).then((res) => res.json())

        console.log(results)


        return res.status(200).json({
            status: "Ok",
            data: results
        })

    } catch (e) {
        return res.status(400).json({
            status: e.message
        })
    }
}