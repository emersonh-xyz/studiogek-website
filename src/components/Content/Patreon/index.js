import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import PostCard from '@/components/Content/Patreon/PostCard';
import fetchRecentPosts from '@/utils/mongo/recent_posts'
import { Container, Card, Text, Grid, Badge } from "@nextui-org/react";
import LoadingSpinner from '@/components/Utility/LoadingSpinner';

export default function PatreonContent() {

    const { data: session, status } = useSession()

    const [userTier, setUserTier] = useState();
    const [postData, setPostData] = useState([]);

    // Get all of the posts from the campaign
    const getPosts = async () => {
        const results = await fetchRecentPosts();
        setPostData(results);
    }

    // // Get the current tier of the user
    // const getTier = async () => {
    //     const results = await fetchUserTier();
    //     setUserTier(results);
    // }

    useEffect(() => {

        // Call our asyncronous functions
        getPosts()

        return () => {
            // this now gets called when the component unmounts
        }


    }, [])
    // Loop over all post data
    const PostItems = () => {
        return (
            postData.map((post) => {
                return <PostCard key={post._id} props={post} />
            })
        )
    }

    if (status === "loading") {
        return <LoadingSpinner />
    }

    return (
        <Card css={{ p: '$10', mt: "$10", backgroundColor: "$accent2" }}>
            <Container gap={0} css={{ d: "flex" }}>
                <Text
                    h1
                    size={60}
                    weight="bold"
                >
                    Full Length
                </Text>

                <Text
                    h1
                    size={60}
                    weight="bold"
                    css={{
                        ml: "$5"
                    }}
                    color='$primary'
                >
                    Reactions
                </Text>

            </Container>

            <Text
                h4

                css={{ color: "$accents6" }}
            >
                Stay up-to-date with the newest full length reaction content.
            </Text>

            {postData?.length > 0 ?

                <Grid.Container gap={1} justify="flex-start">
                    < PostItems />
                </Grid.Container >

                :
                <LoadingSpinner />

            }

        </Card >
    )
}