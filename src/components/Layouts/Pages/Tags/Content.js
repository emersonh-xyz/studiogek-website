import { Text, Spacer, Container, Grid, Card, Input, Switch } from "@nextui-org/react"
import { Box } from "./Box.js"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import LoadingSpinner from "@/components/Utility/LoadingSpinner/";
import PostCard from '@/components/Content/Patreon/PostCard';


export const Content = () => {

    const router = useRouter();
    const { tag } = router.query;
    const [posts, setPosts] = useState([]);

    const [searchSeason, setSearchSeason] = useState('')
    const [searchEpisode, setSearchEpisode] = useState('')

    const [sortByNewest, setSortByNewest] = useState(true);


    const getPostsByTag = async () => {

        const results = await fetch(`/api/posts/all/tag?tagName=${tag}`)
            .then((res) => res.json())
            .catch((err) => console.log(err))

        setPosts(results?.data)

    }

    useEffect(() => {

        if (!tag) {
            return
        }

        getPostsByTag()
        // getPost(id)

    }, [tag])


    if (posts === "No posts") {
        router.push("/404")
    }




    return (

        <Box css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>


            <Container css={{ d: "flex", flexWrap: "no-wrap" }} lg gap={1}>

                {posts?.length > 0 && posts !== "No posts" ?

                    <>

                        <Card variant="bordered" css={{ w: "fit-content", h: "fit-content", mt: "$3" }}>

                            <Card.Body>

                                <Input
                                    underlined
                                    labelLeft="Season"
                                    placeholder="1"
                                    type="number"
                                    onChange={(e) => setSearchSeason(e.target.value)}
                                />
                                <Input
                                    underlined
                                    labelLeft="Episode"
                                    placeholder="1"
                                    type="number"
                                    onChange={(e) => setSearchEpisode(e.target.value)}
                                />

                                <Text size={14} color="$accents7" css={{ mt: "$5" }}>Sort by: Newest</Text>
                                <Switch checked onChange={() => { setPosts([...posts].reverse()) }} size={"xs"} ></Switch>
                            </Card.Body>


                            <Container css={{ d: "flex", justifyContent: "center", flexDirection: 'column' }}>
                            </Container>
                        </Card>

                        <Spacer x={2} />
                        <Grid.Container gap={1} justify="flex-start">

                            {posts?.filter((post) => {
                                const seasonMatch = searchSeason.toLowerCase() === '' ? true : post.seasonNumber.toLowerCase().includes(searchSeason)
                                const episodeMatch = searchEpisode.toLowerCase() === '' ? true : post.episodeNumber.toLowerCase().includes(searchEpisode)
                                return seasonMatch && episodeMatch
                            }).map((post) => {
                                return <PostCard key={post._id} props={post} />
                            })}
                        </Grid.Container >
                    </>

                    :
                    <LoadingSpinner />

                }





            </Container>
        </Box>
    )
};