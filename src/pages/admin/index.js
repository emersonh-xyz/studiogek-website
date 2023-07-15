import { Icon } from "@iconify/react";
import { Button, Container, Text, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";




export default function AdminPanel() {

    const [isAdmin, setAdmin] = useState(false)

    async function checkAdminStatus() {
        const results = await fetch('/api/admin/isAdmin')
            .then((res) => res.json())
            .catch((err) => console.log(err));

        console.log(results)
        if (results.isAdmin) {
            setAdmin(true);
        }
    }

    useEffect(() => {
        checkAdminStatus();
    })


    const AdminDashboard = () => {
        return (
            <Container>
                <Text h1>Admin Dashboard</Text>
                <Text h4>Create, edit, and delete posts from one place</Text>

                <Container gap={0} css={{ d: 'flex', flexDirection: 'column' }}>
                    <Button flat css={{ mb: "$5" }} as={Link} auto href="/admin/post-creator" color={"primary"} icon={<Icon icon={"material-symbols:upload"} />}>Post Creator</Button>
                    <Button flat css={{ mb: "$5" }} as={Link} auto href="/admin/tag-creator" color={"primary"} icon={<Icon icon={"ri:tv-fill"} />}>Tag Creator</Button>
                    <Button flat as={Link} auto href="/admin/tag-creator" color={"error"} icon={<Icon icon={"mdi:hammer"} />}>Manager</Button>
                </Container>
            </Container >
        )
    }

    return (
        isAdmin ? <AdminDashboard /> : <div>Nice try</div>



    )

}
