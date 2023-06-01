import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row, Badge, Col } from "@nextui-org/react";

import timeAgo from '@/utils/timeAgo';
import { Icon } from '@iconify/react';



export default function PostCard({ props }) {

    const router = useRouter();

    return (

        <Grid sm={4} key={props.id}>
            <Card css={{ d: 'flex', justifyItems: 'center', m: "auto" }} isPressable isHoverable onPress={() => router.push(`/reaction/${props.url}`)}>
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={props.thumbnail}
                        alt={props.title}
                    />
                </Card.Body>
                <Card.Footer

                    css={{

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
                                        <Link href={`/reaction/${props.url}`} css={{ fontWeight: " $medium", color: "$accents8" }} underline >{props?.tag.title} {props?.seasonNumber}x{props?.episodeNumber} FULL</Link>
                                    </Text>

                                    <Text weight="semibold" css={{ fontSize: "13px" }}  >
                                        Posted {timeAgo(props.timestamp)}
                                    </Text>
                                    <Text size={12} weight="bold">
                                        <Link href={`/reaction/tags/${props?.tag.safeTitle}`} css={{ fontWeight: " $medium", color: "primary" }} underline >{props?.tag.title}</Link>
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