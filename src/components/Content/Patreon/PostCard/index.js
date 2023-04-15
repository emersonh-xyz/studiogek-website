import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';



export default function PostCard({ props }) {

    const { data: session, status } = useSession()
    const router = useRouter();

    return (
        <Grid sm={4} >
            <Card css={{ w: "400px", h: "300px", backgroundColor: "$accents0" }} variant="flat" >


                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={`${props.imageUrl}`}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        alt="Relaxing app background"
                    />
                </Card.Body>
                <Card.Footer css={{ d: "flex", flexDirection: "column", justifyContent: "end" }}>

                    <Container gap={0}>
                        <Text h3>{props.title}</Text>

                        {status === "unauthenticated" ?
                            <Tooltip content={"You must be signed in"} placement="right">
                                <Button
                                    flat
                                    disabled

                                    target="_blank"
                                    onClick={() => {
                                        router.push({
                                            pathname: '/reaction/[id]',
                                            query: { id: props.safeTitle }
                                        })
                                    }}
                                >
                                    View Post
                                </Button>
                            </Tooltip>
                            :
                            <Button
                                flat

                                color="primary"
                                target="_blank"
                                onClick={() => {
                                    router.push({
                                        pathname: '/reaction/[id]',
                                        query: { id: props.safeTitle }
                                    })
                                }}
                            >
                                View post
                            </Button>
                        }

                    </Container>
                </Card.Footer>
            </Card >
        </Grid>
    )
}