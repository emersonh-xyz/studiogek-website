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

            <div className="card w-96 glass mx-auto">
                <figure><img src={session.user.image} alt="car!" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Welcome back, {session.user.name}</h2> <br />
                    <h1 className="">Email: {session.user.email} </h1>
                    <h1 className="">Tier: {tier?.display}</h1>
                    <div className="card-actions justify-end">
                        <button className="btn" onClick={() => signOut()}>Sign out</button>
                    </div>
                </div>
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
