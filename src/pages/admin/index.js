import EditPosts from "@/components/Utility/Admin/EditPosts";
import PostCreator from "@/components/Utility/Admin/PostCreator";
import { Button, Container, Text, Collapse, Card, Input, Radio, Grid, Spacer } from "@nextui-org/react";




export default function AdminPanel() {

    return (

        <Container>
            <Text h1 color="primary">Admin Dashboard</Text>

            <PostCreator />
            {/* <EditPosts /> */}

        </Container >
    )

}
