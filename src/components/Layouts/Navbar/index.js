import React, { useEffect, useState } from "react";
import { Navbar, Button, Link, Text, User, Dropdown, Avatar, Modal } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import { useRouter } from "next/router";

export default function App() {
    const [variant, setVariant] = useState("sticky");
    const [tags, setTags] = useState([]);
    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();


    // Modal stuff
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    const router = useRouter();

    const getAllTags = async () => {
        const results = await fetch("/api/tags/all")
            .then((res) => res.json());
        setTags(results.data);
        console.log(results)
    }

    useEffect(() => {
        getAllTags();
    }, [])

    const collapseItems = [
        "Patreon",
        "Discord",
        "Full Length",
        "Fan Art",
        "Shop",
    ];

    const { data: session } = useSession()

    return (
        <Navbar isBordered variant="sticky">
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
                css={{
                    "@xs": {
                        w: "12%",
                    },
                }}
            >

                <Image onClick={() => router.push("/")} width={60} height={60} src={isDark ? "/static/logo_white.png" : "/static/logo_black.png"}></Image>
            </Navbar.Brand>
            <Navbar.Content
                enableCursorHighlight
                activeColor="primary"
                hideIn="xs"
                variant="highlight-rounded"
            >
                {/* <Navbar.Link target="_blank" href="https://www.patreon.com/studiogek/">Home</Navbar.Link> */}
                <Navbar.Link onClick={() => handler()} target="_blank">Full Length</Navbar.Link>
                <Navbar.Link target="_blank" href="https://www.patreon.com/studiogek/">Patreon</Navbar.Link>
                <Navbar.Link target="_blank" href="https://discord.gg/studiogek">Discord</Navbar.Link>
                <Navbar.Link target="_blank" href="https://shop.studiogekyt.com/">Shop</Navbar.Link>


            </Navbar.Content>
            <Navbar.Content
                css={{
                    "@xs": {
                        w: "12%",
                        jc: "flex-end",
                    },
                }}
            >
                {session ?
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as="button"
                                    color="primary"
                                    size="md"
                                    src={`${session?.user.image}`}
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="secondary"
                        >
                            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    {session?.user.name}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error">
                                <Text onClick={() => signOut()}>Log Out</Text>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <Avatar
                        bordered
                        as="button"
                        color="primary"
                        size="md"
                        icon={<Icon width={20} height={20} icon={"clarity:avatar-solid"}></Icon>}
                        onClick={() => signIn("patreon")}
                    />
                }
            </Navbar.Content>
            <Navbar.Collapse>

                <Navbar.CollapseItem>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                            "&:hover": {
                                color: "$primary"
                            }
                        }}
                        onPress={handler}
                    >
                        Full Length
                    </Link>
                </Navbar.CollapseItem>

                <Navbar.CollapseItem>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                            "&:hover": {
                                color: "$primary"
                            }
                        }}
                        href="https://www.patreon.com/studiogek/"
                    >
                        Patreon
                    </Link>
                </Navbar.CollapseItem>

                <Navbar.CollapseItem>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                            "&:hover": {
                                color: "$primary"
                            }
                        }}
                        href="https://discord.gg/studiogek/"
                    >
                        Discord
                    </Link>
                </Navbar.CollapseItem>

                <Navbar.CollapseItem>
                    <Link
                        color="inherit"
                        css={{
                            minWidth: "100%",
                            "&:hover": {
                                color: "$primary"
                            }
                        }}
                        href="https://www.shop.studiogekyt.com/"
                    >
                        Shop
                    </Link>
                </Navbar.CollapseItem>

            </Navbar.Collapse>


            <Modal
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        Reaction Content (this is very temporary)

                    </Text>
                </Modal.Header>
                <Modal.Body css={{ ta: "center" }}>
                    {tags?.map((tag) => {
                        return (
                            <Button onPress={() => router.push(`/reaction/tags/${tag.safeTitle}`)} key={tag.title} color="primary" css={{ d: 'flex', justifyContent: 'center', justifyItems: 'center' }}>{tag.title}</Button>
                        )
                    })}
                </Modal.Body>
            </Modal>

        </Navbar>
    )
}
