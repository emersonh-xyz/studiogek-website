import { useSession } from "next-auth/react"

export default function AdminPanel() {
    const { data: session, status } = useSession();



    return (
        <div>
            {session?.user.email}
        </div>
    )
}