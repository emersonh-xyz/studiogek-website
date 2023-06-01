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

                <Image onClick={() => router.push("/")} width={85} height={85} src={isDark ? "/static/logo_white.png" : "/static/logo_black.png"}></Image>
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
                    <Dropdown closeOnSelect={false} placement="bottom-right">
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
                            color="primary"
                        >
                            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" >
                                    Signed in as <Text size={14}>{session?.user.email}</Text>
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item icon={<Icon icon={isDark ? "ph:moon-fill" : "ph:sun-fill"} />} withDivider key="theme change" >
                                <Text
                                    onClick={() => {
                                        isDark ? setTheme("light") : setTheme("dark")
                                    }}
                                    size="md"
                                >{isDark ? "Light Theme" : "Dark Theme"}</Text>
                            </Dropdown.Item>
                            <Dropdown.Item icon={<Icon icon={"material-symbols:logout"}></Icon>} key="logout" withDivider color="error">
                                <Text onClick={() => signOut()}>Sign out</Text>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :
                    <Dropdown closeOnSelect={false} placement="bottom-right" >
                        <Navbar.Item >
                            <Dropdown.Trigger>
                                <Avatar
                                    bordered
                                    as="button"
                                    color={"primary"}
                                    size="md"
                                    icon={<Icon color="white" width={15} height={15} icon={"clarity:avatar-solid"}></Icon>}

                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"

                        >

                            <Dropdown.Item fill="var(--nextui-colors-secondary)" icon={<Icon icon={"mdi:patreon"} />} key="login">
                                <Text onClick={() => signIn("patreon")} rounded auto color="inherit" >

                                    Login
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item icon={<Icon icon={isDark ? "ph:moon-fill" : "ph:sun-fill"} />} withDivider key="theme change" >
                                <Text
                                    onClick={() => {
                                        isDark ? setTheme("light") : setTheme("dark")
                                    }}
                                    size="md"
                                >{isDark ? "Light Theme" : "Dark Theme"}</Text>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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
                <Modal.Header >
                    <Text h4 id="modal-title" >
                        Reaction Content (this is very temporary)
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {tags?.map((tag) => {
                        return (
                            <Link href={`/reaction/tags/${tag.safeTitle}`} key={tag.title} color="primary" css={{ ta: 'center' }}>{tag.title}</Link>
                        )
                    })}
                </Modal.Body>
            </Modal>

        </Navbar>
    )
}
