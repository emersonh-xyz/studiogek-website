import { Button, Container, Text, Card, Input, Radio, Grid, Spacer, Checkbox } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import tierList from "../../../config/tierList"

import clientPromise from "@/lib/mongodb";

export default function PostCreator({ tags }) {

    const [checkedTag, setCheckedTag] = useState('attack-on-titan');
    const [checkedTier, setCheckedTier] = useState('gek');

    const [postTitle, setPostTitle] = useState("");
    const [episodeNumber, setEpisodeNumber] = useState("");
    const [seasonNumber, setSeasonNumber] = useState("");
    const [streamableId, setStreamableId] = useState("");

    const router = useRouter();

    async function handleSubmit(e) {

        const data = {
            title: postTitle,
            titleFormatted: `${postTitle} ${seasonNumber}x${episodeNumber}`,
            seasonNumber: seasonNumber,
            episodeNumber: episodeNumber,
            streamableId: streamableId,
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
                        rounded
                        bordered
                        label="Season #"
                        placeholder="1"
                        color="primary"
                        value={seasonNumber}
                        onChange={(e) => setSeasonNumber(e.target.value)}
                    />
                    <Input
                        rounded
                        bordered
                        label="Episode #"
                        placeholder="1"
                        color="primary"
                        value={episodeNumber}
                        onChange={(e) => setEpisodeNumber(e.target.value)}
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


                    <Grid>
                        <Radio.Group value={checkedTier} orientation="horizontal"
                            onChange={setCheckedTier} size="sm" label="Tiers" >
                            <Radio value={tierList[3]}>Gek Tier</Radio>
                            <Radio value={tierList[2]}>Uncut Tier</Radio>
                            <Radio value={tierList[1]}>Voting</Radio>
                            <Radio value={tierList[0]}>Public</Radio>
                        </Radio.Group>
                    </Grid>


                    <Text color="$accents6">Show Tag</Text>
                    <Button.Group flat size="xs" color="primary" >

                        {tags && tags.map((tag) => {
                            return (
                                <Button onClick={() => setCheckedTag(tag)} key={tag.safeTitle}>{tag.title}</Button>
                            )
                        })}

                    </Button.Group>

                    <Button onPress={() => { handleSubmit() }} flat color="success" css={{ mt: 5 }}>Upload Post</Button>
                </Card.Body>

            </Card>

            <Spacer x={2} />

            <Card>

                <Card.Header>
                    <Text h1>Post Preview</Text>

                </Card.Header>
                <Card.Body>


                    <Container css={{ width: "100%", height: "0px", position: "relative", pb: "56.250%" }}>
                        <iframe src={`https://streamable.com/e/${streamableId}`} frameBorder="0" width="100%" height="100%" allowFullScreen style={{ width: "100%", height: "100%", position: "absolute", left: "0", top: "0", overflow: "hidden" }}>
                        </iframe>
                    </Container>
                    <Container css={{ p: 0, position: "relative", display: "inline-block" }}>
                        <Card.Image css={{ filter: "brightness(40%)", backgroundColor: "rgba(0, 0, 0, 0.5)" }} objectFit="cover" src={checkedTag.thumbnail} />
                    </Container>
                </Card.Body>


            </Card>
        </Container >
    )
}

export async function getServerSideProps() {
    try {

        const client = await clientPromise
        const db = client.db("studiogek_website")


        const tags = await db.collection('tags').find().toArray();

        return {
            props: { tags: JSON.parse(JSON.stringify(tags)) },
        };

    } catch (e) {
        console.error(e);
    }
}