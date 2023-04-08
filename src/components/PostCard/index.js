import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link } from "@nextui-org/react";
import { Icon } from '@iconify/react';

export default function PostCard({ props }) {

    // props.attributes.title
    // props.attributes.content
    // props.attributes.tiers[]
    // props.attributes.url
    // props.attributes.published_at
    // props.id

    const router = useRouter();

    function getDate() {
        const pastDate = new Date(props.attributes.published_at);
        const timeSince = Date.now() - pastDate.getTime();
        const seconds = Math.floor(timeSince / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `Posted ${days} day${days > 1 ? 's' : ''} and ${hours % 24} hour${hours % 24 > 1 ? 's' : ''} ago`;
        } else {
            return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
    }


    return (
        <Grid xs={4}>
            <Card css={{ p: "$6", mw: "400px" }}>
                <Card.Header>
                    <Icon width={34} height={34} icon={"material-symbols:video-camera-back-rounded"} />
                    <Grid.Container css={{ pl: "$6" }}>
                        <Grid xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                                {props.attributes.title}
                            </Text>
                        </Grid>
                        <Grid xs={12}>
                            <Text css={{ color: "$accents8" }}>{getDate()}</Text>
                        </Grid>
                    </Grid.Container>
                </Card.Header>
                <Card.Body css={{ py: "$2" }}>
                    <Text>
                        {parse(props.attributes.content)}
                    </Text>
                </Card.Body>
                <Card.Footer>
                    <Text
                        icon
                        color="primary"
                        target="_blank"
                        onClick={() => {
                            router.push({
                                pathname: '/post/[pid]',
                                query: { pid: props.id }
                            })
                        }}
                    >
                        View post
                    </Text>
                </Card.Footer>
            </Card >
        </Grid>
    )
}