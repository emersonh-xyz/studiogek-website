import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row, Badge, Col } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import timeAgo from '@/utils/timeAgo';
import Image from 'next/image';
import hyphenToTitleCase from '@/utils/hyphenToTitleCase';



export default function PostCard({ props }) {

    console.log("props", props)

    return (

        <Grid sm={4} key={props.id}>
            <Card >
                <Card.Body css={{ p: 0 }}>
                    <Card.Image
                        src={props.tag.thumbnail}
                        objectFit="cover"
                        width={800}
                        height={300}
                        alt={props.title}
                    />
                </Card.Body>
                <Card.Footer
                    isBlurred
                    css={{
                        position: "absolute",
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
                                    <Text color="#d1d1d1" size={16}>
                                        {props.title} {props?.seasonNumber}x{props?.episodeNumber}
                                    </Text>
                                    <Link href={`/reaction/tags/${props.tag.safeTitle}`} css={{ fontSize: "12px", color: "#d1d1d1", fontWeight: "$medium" }} underline >
                                        {timeAgo(props.timestamp)}
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row justify="flex-end">
                                <Button
                                    size="sm"
                                    auto
                                    ghost
                                    color="success"
                                >
                                    <Text
                                        css={{ color: "inherit" }}
                                        size={10}
                                        weight="bold"
                                        transform="uppercase"
                                        as={Link}
                                        href={`/reaction/${props.url}`}
                                    >
                                        View Post
                                    </Text>
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Card.Footer>
            </Card >
        </Grid >
    )
}