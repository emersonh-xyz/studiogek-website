import { Button, Container, Text, Card, Input, Radio, Grid, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import tierList from "../../../../config/tierList"

export default function PostCreator() {

    const [checkedTag, setCheckedTag] = useState('aot');
    const [checkedTier, setCheckedTier] = useState('gek');

    const [postTitle, setPostTitle] = useState("");
    const [streamableId, setStreamableId] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const router = useRouter();

    async function handleSubmit(e) {

        const data = {
            title: postTitle,
            streamableId: streamableId,
            imageUrl: imageUrl,
            tag: checkedTag,
            tier: checkedTier,

        }

        const response = await fetch('/api/posts/new', {
            method: "POST",
            body: JSON.stringify(data)
        }).then((res) => res.json());

        const url = response.data.url

        router.push(`/reaction/${url}`)
    }


    return (
        <Container gap={0} css={{ d: 'flex', flexWrap: 'nowrap' }}>

            <Card css={{ height: "fit-content" }}>
                <Card.Body >
                    <Text h1 >Create Post</Text>
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

                        value={streamableId}
                        onChange={((e) => setStreamableId(e.target.value))}

                    />
                    <Input
                        css={{ mt: 5 }}
                        rounded
                        bordered
                        label="Thumbnail Link"
                        placeholder="https://image.com/png"

                        value={imageUrl}
                        onChange={((e) => setImageUrl(e.target.value))}

                    />
                    <Grid.Container gap={2}>
                        <Grid>
                            <Radio.Group value={checkedTag}
                                onChange={setCheckedTag} size="sm" label="Tags">
                                <Radio value="attack-on-titan">Attack on Titan</Radio>
                                <Radio value="the-mandalorian">The Mandalorian</Radio>
                                <Radio value="the-last-of-us">The Last Of Us</Radio>
                                <Radio value="vinland-saga">Vinland Saga</Radio>
                            </Radio.Group>
                        </Grid>
                        <Grid>
                            <Radio.Group value={checkedTier}
                                onChange={setCheckedTier} size="sm" label="Tiers" >
                                <Radio value={tierList[3]}>Gek Tier</Radio>
                                <Radio value={tierList[2]}>Uncut Tier</Radio>
                                <Radio value={tierList[1]}>Voting</Radio>
                                <Radio value={tierList[0]}>Public</Radio>
                            </Radio.Group>
                        </Grid>
                    </Grid.Container>


                    <Button onPress={() => { handleSubmit() }} flat color="success" css={{ mt: 5 }}>Upload Post</Button>
                </Card.Body>

            </Card>

            <Spacer x={2} />

            <Card>

                <Card.Header>
                    <Text h1>Post Preview</Text>

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
    )
}