import { Card, Container, Grid, Row, Text } from "@nextui-org/react";
import { useEffect, useState } from "react";
import IframeEmbed from "../../Utility/IframeEmbed";


export default function YoutubeContent() {

    return (
        <Card css={{ p: '$10', mt: "$10", backgroundColor: "$accents" }}>
            <Container gap={0} css={{ d: "flex", justifyContent: "center" }}>
                <Text
                    h1
                >
                    New from YouTube
                </Text>

                {/* <Text
                    h1
                    size={60}
                    weight="bold"
                    css={{ ml: "$5" }}
                    color='error'
                >
                    YouTube
                </Text> */}

            </Container>

            <Text
                h4
                css={{ color: "$accents6", d: "flex", justifyContent: "center" }}
                weight="medium">
                The latest uploads from our YouTube channel
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