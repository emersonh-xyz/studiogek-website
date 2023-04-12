import { Card, Container, Text, Grid, Col, Badge, Tooltip } from "@nextui-org/react";
import Artwork from '../../config/fan_art_submissions'
import { useState } from "react";
import { Icon } from "@iconify/react";


export default function ArtContainer() {

    const Art = () => {
        return (
            Artwork.map((art) => {
                return (
                    <Grid >
                        <Tooltip
                            content={`Art by ${art.name}`}
                            trigger="hover"
                            shadow
                            color="secondary"
                        >


                            <a href={art.img} target="_blank">
                                <Card isHoverable isPressable>
                                    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                    </Card.Header>
                                    <Card.Image
                                        src={art.img}
                                        objectFit="fill"
                                        height={300}
                                        alt="Card image background"
                                    />
                                </Card>
                            </a>
                        </Tooltip>
                    </Grid >
                )
            })
        )
    }


    return (

        <Card variant='bordered' css={{ p: '$10', mt: "$10", backgroundColor: "$accent2" }}>
            <Container gap={0} css={{ d: "flex", }}>
                <Text
                    h1
                    size={60}
                    weight="bold"
                >
                    Fan Art
                </Text>

                <Text
                    h1
                    size={60}
                    weight="bold"
                    css={{ ml: "$7", }}
                    color='secondary'
                >
                    Submissions
                </Text>


            </Container>



            <Text
                h4
                weight="thin">
                💗 Artwork submitted by members from our Discord
            </Text>


            <Grid.Container gap={5} justify="center">

                <Art />

            </Grid.Container>

        </Card >
    )
}