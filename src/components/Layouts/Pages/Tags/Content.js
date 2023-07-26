import { Text, Spacer, Container, Grid, Card, Input, Switch, Dropdown, StyledDropdownSectionTitle } from "@nextui-org/react"
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
    const [selected, setSelected] = React.useState('Oldest');


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

            <Container lg gap={1}>
                <Text
                >Showing {posts?.length} results for {posts[0]?.title}</Text>
            </Container>
            <Container css={{ justifyContent: 'center', w: "fit-content", d: "flex", flexWrap: "wrap", "@xs": { flexWrap: "nowrap" } }} lg gap={1}>

                {posts?.length > 0 && posts !== "No posts" ?

                    <>

                        <Card variant="bordered" css={{ w: "full", '@xs': { w: "400px" }, h: "fit-content", mt: "$3" }}>

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

                                <div style={{ display: 'flex', alignItems: 'center', paddingTop: "10px" }}>
                                    <Text size={14} color="$accents7" css={{ marginRight: '10px' }}>
                                        Sort by:
                                    </Text>
                                    <Dropdown style={{ position: 'relative' }}>
                                        <Dropdown.Button flat size="sm" >
                                            {selected}
                                        </Dropdown.Button>
                                        <Dropdown.Menu
                                            style={{ position: 'absolute', top: '100%', left: 0 }}
                                            disallowEmptySelection
                                            selectionMode="single"
                                            selectedKeys={selected}
                                            onSelectionChange={setSelected}
                                        >
                                            <Dropdown.Item key="Oldest"><Text onClick={() => setPosts([...posts].reverse())}>Oldest</Text></Dropdown.Item>
                                            <Dropdown.Item key="Newest"><Text onClick={() => setPosts([...posts].reverse())}>Newest</Text></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                {/* <Switch checked onChange={() => { setPosts([...posts].reverse()) }} size={"xs"} ></Switch> */}
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