import { useSession, signIn, signOut } from "next-auth/react"

export default function Navbar() {

    const { data: session } = useSession();


    return (

        <div div className="navbar bg-base-100" >
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">Studio Gek</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                </div>
                <div className="dropdown dropdown-end">

                    {session ?

                        <div>
                            <div className="flex items-center">
                                <p className="font-bold mr-2">{session.user.name}</p>
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={session.user.image} />

                                    </div>
                                </label>
                            </div>

                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">

                                <li><a onClick={() => signOut()}>Logout</a></li>
                            </ul>
                        </div>
                        :
                        <button onClick={() => signIn("patreon")}>Login with Patreon</button>
                    }

                </div>
            </div>
        </div>
    )
}