import React, { useEffect, useState } from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'

export default function Account() {
    const { data: session, status } = useSession();
    const [tier, setTier] = useState();
    const tierList = require("../config/tiers")

    useEffect(() => {


        // Fetch the tierID from the users Patreon profile
        const getUserTier = async () => {
            const results = await fetch('/api/patreon/user/tier')
                .then((res) => {
                    return res.json();
                })

            // TierID we fetched from the users Patreon Profile
            const tierId = results.data;

            console.log(results)
            // If we got back nothing,
            if (tierId !== "") {
                for (let i = 0; i < tierList.length; i++) {
                    let tier = tierList[i];
                    if (tier.id === tierId) {
                        setTier(tier.display)
                    }
                }
            }

        };

        getUserTier()
    }, [])

    if (status === 'authenticated') {

        return (
            <div className="text-center">
                <img className="mx-auto" src={session.user.image}></img>
                <h1 className="text-lg text-blue-400">Signed in as {session.user.name} </h1><br />
                <h1 className="text-lg text-blue-400">Current membership: {tier}</h1><br />
                <button className="btn" onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    return (
        <div className="text-center">
            Not signed in <br />
            <button className="btn" onClick={() => signIn()}>Sign in</button>
        </div>
    )
}
