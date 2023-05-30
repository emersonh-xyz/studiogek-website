import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row, Badge, Col } from "@nextui-org/react";

import timeAgo from '@/utils/timeAgo';



export default function PostCard({ props }) {

    const router = useRouter();

    return (

        <Grid sm={4} key={props.id}>
            <Card isPressable isHoverable onPress={() => router.push(`/reaction/${props.url}`)}>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={props.thumbnail}
                        objectFit="fit"
                        alt={props.title}
                    />
                </Card.Body>
                <Card.Footer
                    isBlurred
                    css={{

                        bgBlur: "#0f111466",
                        borderTop: "$borderWeights$light solid $gray800",
                        bottom: 0,
                        zIndex: 1,
                    }}
                >
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Text size={16} weight="bold">
                                        <Link href={`/reaction/${props.url}`} css={{ fontWeight: " $medium", color: "$accents8" }} underline >{props?.tag.title} {props?.seasonNumber}x{props?.episodeNumber}</Link>
                                    </Text>
                                    <Text color="white" css={{ fontSize: "13px" }}  >
                                        Posted {timeAgo(props.timestamp)}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Card.Footer>
            </Card >
        </Grid >
    )
}