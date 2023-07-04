import { Button, Container, Text, Collapse, Card, Input, Radio, Grid, Spacer, Link } from "@nextui-org/react"
import { useRouter } from "next/router";
import { useState } from "react";


export default function AdminPanel() {


    const [title, setTitle] = useState("");
    const router = useRouter();

    function hyphenate(str) {
        return str.toLowerCase().replace(/\s+/g, '-');
    }

    async function handleSubmit() {

        const data = {
            title: title,
            safeTitle: hyphenate(title),
        }

        const response = await fetch('/api/tags/new', {
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => res.json());

        if (response) {
            alert("Tag was succesfully created, click OK to redirect")
            router.push(`/admin/`)
        }

    }

    return (

        <Container>
            <Text h1 color="">Admin Dashboard</Text>

            <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>

                <Card css={{ height: "fit-content" }}>
                    <Card.Body >
                        <Text h1 color="warning">Tag Creator</Text>
                        <Input
                            rounded
                            bordered
                            label="Tag Title"
                            placeholder="Attack On Tian"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                        <Button onPress={() => { handleSubmit() }} flat color="success" css={{ mt: 10, w: "50px" }}>Create Tag</Button>
                    </Card.Body>


                </Card>


            </Container >
        </Container>
    )

}
