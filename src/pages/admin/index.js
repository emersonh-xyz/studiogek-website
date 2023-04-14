import { Button, Container, Text, Collapse, Card, Input, Radio, Grid, Spacer } from "@nextui-org/react";
import { useMemo, useState } from "react";


export default function AdminPanel() {

    const [checkedTag, setCheckedTag] = useState('aot');
    const [checkedTier, setCheckedTier] = useState('gek');

    const [postTitle, setPostTitle] = useState("");
    const [streamableId, setStreamableId] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    async function handleSubmit(e) {

        e.preventDefault();
        const formData = new FormData();

        formData.append('title', postTitle);
        formData.append('streamableId', setStreamableId);
        formData.append('imageUrl', imageUrl)
        formData.append('tag', checkedTag)
        formData.append('tier', checkedTier)

        const response = await axios.post('/api/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response);

    }

    return (

        <Container>
            <Text h1 color="primary">Admin Dashboard</Text>
            <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>

                <Card css={{ height: "fit-content" }}>
                    <Card.Body >
                        <Text h1 color="success">Create Post</Text>
                        <Input
                            rounded
                            bordered
                            label="Post Title"
                            placeholder="Attack On Tian 1x2"
                            color="primary"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                        <Input
                            css={{ mt: 5 }}
                            rounded
                            bordered
                            label="Streamable Video ID"
                            placeholder="pxxcct"
                            color="secondary"
                            value={streamableId}
                            onChange={((e) => setStreamableId(e.target.value))}

                        />
                        <Input
                            css={{ mt: 5 }}
                            rounded
                            bordered
                            label="Thumbnail Link"
                            placeholder="https://image.com/png"
                            color='warning'
                            value={imageUrl}
                            onChange={((e) => setImageUrl(e.target.value))}

                        />
                        <Grid.Container gap={2}>
                            <Grid>
                                <Radio.Group value={checkedTag}
                                    onChange={setCheckedTag} size="sm" label="Tags">
                                    <Radio value="aot">Attack on Titan</Radio>
                                    <Radio value="mando">The Mandalorian</Radio>
                                    <Radio value="lastofus">The Last Of Us</Radio>
                                    <Radio value="vinland">Vinland Saga</Radio>
                                </Radio.Group>
                            </Grid>
                            <Grid>
                                <Radio.Group value={checkedTier}
                                    onChange={setCheckedTier} size="sm" label="Tiers" >
                                    <Radio value="gek">Gek Tier</Radio>
                                    <Radio value="uncut">Uncut Tier</Radio>
                                    <Radio value="voting">Voting</Radio>
                                </Radio.Group>
                            </Grid>
                        </Grid.Container>


                        <Button onPress={() => { handleSubmitr() }} flat color="success" css={{ mt: 5 }}>Upload Post</Button>
                    </Card.Body>

                </Card>

                <Spacer x={2} />

                <Card>

                    <Card.Header>
                        <Text h1 color="success">Post Preview</Text>

                    </Card.Header>
                    <Card.Body>

                        <Text h3>{postTitle}</Text>

                        <Container css={{ width: "100%", height: "0px", position: "relative", pb: "56.250%" }}>
                            <iframe src={`https://streamable.com/e/${streamableId}`} frameborder="0" width="100%" height="100%" allowfullscreen style={{ width: "100%", height: "100%", position: "absolute", left: "0", top: "0", overflow: "hidden" }}>
                            </iframe>
                        </Container>


                        <Card.Image objectFit="scale-down" src={imageUrl}>
                        </Card.Image>
                    </Card.Body>


                </Card>


            </Container >
        </Container >
    )

}
