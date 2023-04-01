import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
    const { data: session } = useSession()
    console.log(session);


    return (
        <div className="mt-20 text-center">
            <br />
            <button className="btn" onClick={() => signIn()}>Sign in</button>
        </div>
    )
}
