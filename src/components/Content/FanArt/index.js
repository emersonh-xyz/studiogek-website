import { Card, Container, Text, Grid, Tooltip, Link, Modal, Image } from "@nextui-org/react";
import Artwork from '../../../config/fan_art_submissions'


export default function ArtContent() {


    const Art = () => {
        return (
            Artwork.map((art) => {

                return (
                    <Grid xs={4} key={art.img}>
                        <Tooltip
                            content={`${art.title} by ${art.author}`}
                            trigger="hover"
                            shadow
                            color="invert"
                            placement="bottom"
                        >
                            <Card variant="" css={{ backgroundColor: "$background" }} isPressable >
                                <Image
                                    src={art.img}
                                    objectFit="scale-down"
                                    height={400}
                                    width={400}
                                    alt="Card image background"
                                />
                            </Card>

                        </Tooltip>
                    </Grid >

                )
            })
        )
    }


    return (

        <Card variant='bordered' css={{ p: '$10', mt: "$10", backgroundColor: "$accent2" }} id="fan-art">
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
                weight="thin"
                css={{ ta: "center" }}>
                Artwork submitted by members from our Discord
            </Text>


            <Grid.Container gap={5} justify="flex-start">

                <Art />


            </Grid.Container>

        </Card >
    )
}