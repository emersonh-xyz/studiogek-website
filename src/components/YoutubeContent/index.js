import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import IframeEmbed from "../IframeEmbed";


export default function YoutubeContent() {

    const [videos, setVideos] = useState([]);

    async function getYoutubeVideos() {

        // const channelId = "UCvdcBgHnd2WgJoP1irXxg1g";
        // const result = 6;
        // const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${result}`

        // const results = await fetch(url)
        //     .then((res) => res.json())
        //     .catch((err) => console.error(err));

        // console.log(results.items)
        // setVideos(results.items)
    }

    useEffect(() => {

        // getYoutubeVideos()

    }, [])


    // const YoutubeEmbeds = () => {

    //     if (videos !== undefined)
    //         return (
    //             videos.map((vid) => {
    //                 return (
    //                     <Grid>
    //                         <iframe
    //                             width="560"
    //                             height="315"
    //                             src={`https://www.youtube.com/embed/${vid.id.videoId}`}
    //                             title="YouTube video player"
    //                             frameborder="0"
    //                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //                             allowfullscreen>
    //                         </iframe>
    //                     </Grid>
    //                 )
    //             })
    //         )
    // }



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
                    color='error'
                >
                    YouTube
                </Text>

            </Container>

            <Text
                h4
                weight="thin">
                Stay up-to-date with Studio Gek's latest uploads on YouTube
            </Text>


            <Grid.Container gap={2} justify="flex-start">

                <Row>
                    <IframeEmbed id={1} />
                    <IframeEmbed id={2} />
                    <IframeEmbed id={3} />
                </Row>
                <Row>
                    <IframeEmbed id={4} />
                    <IframeEmbed id={5} />
                    <IframeEmbed id={6} />
                </Row>

            </Grid.Container>



        </Card >
    )
}