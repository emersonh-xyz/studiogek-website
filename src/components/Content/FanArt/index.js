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
                            <Link href={art.img}>
                                <Image
                                    width="100%"
                                    height="200px"
                                    src={art.img}
                                    objectFit="scale-down"
                                    alt="Card image background"
                                />
                            </Link>

                        </Tooltip>
                    </Grid >

                )
            })
        )
    }


    return (

        <Card css={{ p: '$10', mt: "$10", backgroundColor: "$accent2" }} id="fan-art">
            <Container gap={0} css={{ d: "flex", justifyContent: "center" }}>

                {/* <Text
                    h1
                    size={60}
                    weight="bold"
                >
                    Wall of
                </Text> */}

                <Text

                    css={{
                        textGradient: "45deg, $purple600 -20%, $pink600 100%",
                        fontWeight: 'bold',
                        fontSize: "$3xl",
                        ta: 'center',
                        "@xs": {
                            fontSize: "$5xl"
                        }
                    }}

                >
                    Wall of Fan Art
                </Text>


            </Container>


            <Text
                h5
                css={{ color: "$accents6", ta: "center" }}
                weight="medium">
                Artwork submitted by members from our Discord
            </Text>


            <Grid.Container gap={1} justify="center">

                <Art />


            </Grid.Container>

        </Card >
    )
}