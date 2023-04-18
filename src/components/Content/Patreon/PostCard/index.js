import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import timeAgo from '@/utils/timeAgo';
import Image from 'next/image';



export default function PostCard({ props }) {

    const { data: session, status } = useSession()
    const router = useRouter();

    return (
        <Grid sm={4} >
            <Card isHoverable variant='flat' css={{ h: "fit", mw: "500px", backgroundColor: "$accents0" }}>
                <Card.Header css={{ p: 0 }}>
                    <Card.Image
                        css={{ p: 10 }}
                        width={420}
                        height={280}
                        objectFit="contain"
                        src={
                            props?.imageUrl ? props?.imageUrl
                                :
                                "https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"
                        }
                    />
                </Card.Header>
                <Card.Body css={{ py: 0, mb: 10 }}>
                    <Text h3 b>{props?.title}</Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Icon icon={"ic:outline-access-time-filled"}></Icon>
                        <Text css={{ ml: "$2" }}>Posted {timeAgo(props.timestamp)}</Text>
                    </div>
                </Card.Body>

                <Card.Footer>
                    {status === "authenticated" ?
                        <Button flat css={{ w: "100%" }} rounded color="primary" size="md" onPress={() => { router.push(`/reaction/${props?.safeTitle}`) }}>View Post</Button>
                        :
                        <Button flat css={{ w: "100%" }} disabled size="md">Login to View</Button>
                    }
                </Card.Footer>
            </Card>
        </Grid>
    )
}