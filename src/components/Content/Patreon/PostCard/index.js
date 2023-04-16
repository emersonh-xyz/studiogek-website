import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';



export default function PostCard({ props }) {

    const { data: session, status } = useSession()
    const router = useRouter();

    function timeAgo(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 50) {
            return "Just now";
        } else if (seconds < 60) {
            return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        } else if (minutes < 60) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (hours < 24) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else if (days < 7) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    return (
        <Grid sm={4} >
            <Card variant='flat' css={{ mw: "400px", backgroundColor: "$accents0" }}>
                <Card.Header css={{ flexDirection: "column" }}>
                    <Text h4 b>{props?.title}</Text>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Icon icon={"ic:outline-access-time-filled"}></Icon>
                        <Text css={{ ml: "$1" }}>Posted {timeAgo(props.timestamp)}</Text>
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