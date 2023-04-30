import { Button, Container, Text, Link } from "@nextui-org/react";




export default function AdminPanel() {

    return (

        <Container>
            <Text h1 color="">Admin Dashboard</Text>

            <Button as={Link} href="/admin/post-creator" color={"primary"}>Post Creator</Button>
            <Button as={Link} href="/admin/tag-creator" color={"warning"} css={{ mt: "10px" }} >Tag Creator</Button>


        </Container >
    )

}
