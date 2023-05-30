import parse from 'html-react-parser';
import { useRouter } from "next/router";
import { Card, Text, Grid, Button, Link, Container, Tooltip, Row, Badge, Col } from "@nextui-org/react";
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import timeAgo from '@/utils/timeAgo';
import Image from 'next/image';
import hyphenToTitleCase from '@/utils/hyphenToTitleCase';



export default function PostCard({ props }) {

    // console.log("props", props)

    return (

        <Grid sm={4} key={props.id}>
            <Card >
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

                        bottom: 0,
                        zIndex: 1,

                    }}
                >
                    <Row>
                        <Col>
                            <Row>

                                <Col>
                                    <Text color="#d1d1d1" size={16}>

                                        <Link href={`/reaction/${props.url}`} css={{ fontWeight: "$medium" }} underline >{props?.tag.title} {props?.seasonNumber}x{props?.episodeNumber}</Link>
                                    </Text>
                                    <Text css={{ fontSize: "12px", fontWeight: "$medium" }} underline >
                                        Posted {timeAgo(props.timestamp)}
                                    </Text>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row justify="flex-end">
                                <Button
                                    size="sm"
                                    auto
                                    flat

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