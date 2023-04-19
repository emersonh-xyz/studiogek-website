import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row, Badge } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import timeAgo from '@/utils/timeAgo';
import Image from 'next/image';
import hyphenToTitleCase from '@/utils/hyphenToTitleCase';



export default function PostCard({ props }) {

    const { data: session, status } = useSession()
    const router = useRouter();

    return (
        <Grid sm={4} >
            <Card variant='flat' css={{ h: "fit", mw: "500px", backgroundColor: "$accents0" }}>
                <Card.Header css={{ maxH: 300 }}>
                    <Card.Image

                        width={1920}
                        height={1080}
                        objectFit="contain"
                        src={
                            props?.imageUrl ? props?.imageUrl
                                :
                                "https://img.youtube.com/vi/8C6bei_LNtE/maxresdefault.jpg"
                        }
                    />
                </Card.Header>
                <Card.Body css={{ py: 0, mb: 10 }}>
                    <Container gap={0} css={{ d: 'flex', justifyContent: 'start', flexDirection: "column" }}>
                        <Text b h3>{props?.title} </Text>
                        <Link underline href={`/reaction/tags/${props.tag}`} b>{hyphenToTitleCase(props?.tag)}</Link>
                        <Text size="x-small" b>Posted {timeAgo(props.timestamp)}</Text>
                    </Container>

                </Card.Body>

                <Card.Footer>

                    <Button flat css={{ w: "100%" }} rounded color="primary" size="md" onPress={() => { router.push(`/reaction/${props?.safeTitle}`) }}>View Post</Button>

                </Card.Footer>
            </Card>
        </Grid>
    )
}