import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import PostCard from '@/components/Content/Patreon/PostCard';
import fetchCampaignPosts from '@/utils/fetch_campaign_posts'
import { Container, Card, Text, Grid, Badge } from "@nextui-org/react";
import LoadingSpinner from '@/components/Utility/LoadingSpinner';

export default function PatreonContent() {

    const { data: session, status } = useSession()

    const [userTier, setUserTier] = useState();
    const [postData, setPostData] = useState([]);

    // Get all of the posts from the campaign
    const getPosts = async () => {
        const results = await fetchCampaignPosts();
        setPostData(results.data);
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
            postData.map((data) => {
                return <PostCard key={data.id} props={data} content={data.attributes.content} />
            })
        )
    }

    if (status === "loading") {
        return <LoadingSpinner />
    }

    return (
        <Card variant='bordered' css={{ p: '$10', mt: "$10", backgroundColor: "$accent2" }}>
            <Container gap={0} css={{ d: "flex" }}>
                <Text
                    h1
                    size={60}
                    weight="bold"
                >
                    New from
                </Text>

                <Text
                    h1
                    size={60}
                    weight="bold"
                    css={{ ml: "$5" }}
                    color='$primary'


                >
                    Patreon
                </Text>

            </Container>

            <Text
                h4
                weight="thin">
                Stay up-to-date with Studio Gek's latest posts
            </Text>

            {postData?.length > 0 ?

                <Grid.Container gap={1} justify="flex-start">
                    < PostItems />
                </Grid.Container >

                :
                status === "authenticated" && <LoadingSpinner />

            }

            {status === "unauthenticated" &&

                <Badge css={{ mt: "$5" }} disableOutlin isSquared color="error">
                    You must be logged in to view this content
                </Badge>


            }
        </Card>
    )
}