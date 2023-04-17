import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import timeAgo from '@/utils/timeAgo';



export default function PostCard({ props }) {

    const { data: session, status } = useSession()
    const router = useRouter();

    return (
        <Grid sm={4} >
            <Card variant='flat' css={{ mw: "400px", backgroundColor: "$accents0" }}>
                <Card.Header css={{ flexDirection: "column" }}>
                    <Text h4 b>{props?.title}</Text>

                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Icon icon={"ic:outline-access-time-filled"}></Icon>
                        <Text css={{ ml: "$2" }}>Posted {timeAgo(props.timestamp)}</Text>
                    </div>
                </Card.Header>
                <Card.Divider />
                <Card.Body >
                    <Card.Image w
                        idth={320}
                        height={180} src={props?.imageUrl ? props?.imageUrl : "https://www.charlotteathleticclub.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png"} />
                </Card.Body>
                <Card.Divider />
                <Card.Footer>
                    <Row justify="center">
                        <Button rounded ghost color="gradient" size="sm" onPress={() => { router.push(`/reaction/${props?.safeTitle}`) }}>View Post</Button>
                    </Row>
                </Card.Footer>
            </Card>
        </Grid>
    )
}