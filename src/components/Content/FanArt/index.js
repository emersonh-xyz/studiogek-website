import { Card, Container, Text, Grid, Tooltip, Link, Modal, Image } from "@nextui-org/react";
import Artwork from '../../../config/fan_art_submissions'


export default function ArtContent() {


    const Art = () => {
        return (
            Artwork.map((art) => {

                return (
                    <Grid key={art.img}>
                        <Tooltip
                            content={`${art.title} by ${art.author}`}
                            trigger="hover"
                            shadow
                            color="invert"
                            placement="bottom"
                        >
                            <Image
                                width="200px"
                                height="200px"
                                src={art.img}
                                objectFit="scale-down"
                                alt="Card image background"
                            />

                        </Tooltip>
                    </Grid >

                )
            })
        )
    }


    return (

        <Card css={{ p: '$10', mt: "$10", backgroundColor: "$accent2" }} id="fan-art">
            <Container gap={0} css={{ d: "flex", justifyContent: "center" }}>

                <Text
                    h1
                    size={60}
                    weight="bold"

                >
                    Wall of
                </Text>

                <Text
                    h1
                    size={60}
                    weight="bold"
                    css={{ textGradient: "45deg, $purple600 -20%, $pink600 100%", ml: "$7" }}
                >
                    Fan Art
                </Text>


            </Container>


            <Text
                h4
                css={{ color: "$accents6", d: "flex", justifyContent: "center" }}
                weight="medium">
                Artwork submitted by members from our Discord
            </Text>


            <Grid.Container gap={1} justify="center">

                <Art />


            </Grid.Container>

        </Card >
    )
}