import { Button, Container, Text, Collapse, Card, Input, Radio, Grid, Spacer, Link } from "@nextui-org/react"
import { useRouter } from "next/router";
import { useState } from "react";


export default function AdminPanel() {


    const [tagTitle, setTagTitle] = useState("");
    // const [tagThumbnail, setTagThumbnail] = useState("");

    const router = useRouter();

    function hyphenate(str) {
        return str.toLowerCase().replace(/\s+/g, '-');
    }

    async function handleSubmit() {
        const data = {
            title: tagTitle,
            safeTitle: hyphenate(tagTitle),
            // thumbnail: tagThumbnail
        }

        const response = await fetch('/api/tags/new', {
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => res.json());

        if (response) {
            alert("Tag succesfully created")
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
                            value={tagTitle}
                            onChange={(e) => {
                                setTagTitle(e.target.value)
                            }}

                        />
                        {/* <Input
                            css={{ mt: 5 }}
                            rounded
                            bordered
                            label="Tag Thumbnail"
                            placeholder="google.com/image.png"
                            value={tagThumbnail}
                            onChange={(e) => {
                                setTagThumbnail(e.target.value)
                            }}

                        /> */}

                        <Button onPress={() => { handleSubmit() }} flat color="success" css={{ mt: 10, w: "50px" }}>Create Tag</Button>
                    </Card.Body>


                </Card>


            </Container >
        </Container>
    )

}
