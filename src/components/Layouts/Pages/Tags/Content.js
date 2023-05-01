import { Text, Spacer, Container, Grid, Card, Input } from "@nextui-org/react"
import { Box } from "./Box.js"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router.js";
import LoadingSpinner from "@/components/Utility/LoadingSpinner/";
import PostCard from '@/components/Content/Patreon/PostCard';


export const Content = () => {

    const router = useRouter();
    const { tag } = router.query;

    const [posts, setPosts] = useState([]);

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

            <Container lg gap={0}>
                {posts?.length > 0 && posts !== "No posts" ?

                    <>
                        <Text size={20} css={{ ta: "center" }}>{posts[0]?.tag.title}</Text>

                        <Input labelPlaceholder="Episode Number" type="number" css={{ d: 'flex', justifyContent: 'center', justifyItems: "center" }}></Input>
                        <Input labelPlaceholder="Episode Number" type="number" css={{ d: 'flex', justifyContent: 'center', w: "350px", mt: "5px" }}></Input>

                        <Grid.Container gap={1} justify="flex-start">

                            {posts?.map((post) => {
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