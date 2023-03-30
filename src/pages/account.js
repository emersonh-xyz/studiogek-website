import React, { useEffect, useState } from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'

export default function Account() {
    const { data: session, status } = useSession({ required: true });
    const [tier, setTier] = useState();
    const tierList = require("../config/tiers")

    useEffect(() => {

        // Fetch the tierID from the users Patreon profile
        const getUserTier = async () => {
            const results = await fetch('/api/patreon/user/tier')
                .then((res) => {
                    return res.json();
                })


            //
            const tierObject = tierList.find((tier) => tier.id === results.data);

            setTier(tierObject)

        };

        getUserTier()
    }, [])

    if (status === 'authenticated') {

        return (
            <div className="text-center">
                <img className="mx-auto" src={session.user.image}></img>
                <h1 className="text-lg text-blue-400">Signed in as {session.user.name} </h1><br />
                <h1 className="text-lg text-blue-400">Current membership: {tier?.display}</h1><br />
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
