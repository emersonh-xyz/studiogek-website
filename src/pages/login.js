import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
    const { data: session } = useSession()

    if (session) {

        return (
            <div className="text-center">
                <img className="mx-auto" src={session.user.image}></img>
                <h1 className="text-lg text-blue-400">Signed in as {session.user.name} </h1><br />
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
