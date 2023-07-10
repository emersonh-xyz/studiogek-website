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
    const { isDark } = useTheme();


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

                activeColor="primary"
                hideIn="xs"
                variant="underline-rounded"
            >
                {/* <Navbar.Link target="_blank" href="https://www.patreon.com/studiogek/">Home</Navbar.Link> */}
                <Dropdown>
                    <Navbar.Item>
                        <Dropdown.Button css={{ mr: '0', p: 0 }} color="default" light>
                            Full Length
                        </Dropdown.Button>
                    </Navbar.Item>
                    <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                    >
                        {tags?.map((tag, idx) => {
                            if (idx > 0) {
                                return (
                                    <Dropdown.Item key={idx} withDivider>
                                        <div onClick={() => router.push(`/reaction/tags/${tag.safeTitle}`)}>
                                            <Link href={`/reaction/tags/${tag.safeTitle}`} key={tag.title} color="inherit">{tag.title}</Link>
                                        </div>
                                    </Dropdown.Item>
                                )
                            } else {
                                return (
                                    <Dropdown.Item key={idx}>
                                        <div onClick={() => router.push(`/reaction/tags/${tag.safeTitle}`)}>
                                            <Link href={`/reaction/tags/${tag.safeTitle}`} key={tag.title} color="inherit">{tag.title}</Link>
                                        </div>
                                    </Dropdown.Item>
                                )
                            }

                        })}
                    </Dropdown.Menu>
                </Dropdown>

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
                                    Login with Patreon
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

                <Dropdown>
                    <Navbar.CollapseItem>
                        <Dropdown.Button css={{ mr: '0', p: 0 }} color="default" light>
                            <Text size={18} weight={"medium"}>Full Length</Text>
                        </Dropdown.Button>
                    </Navbar.CollapseItem>
                    <Dropdown.Menu
                        color="primary"
                        variant="light"
                        aria-label="Actions"
                    >
                        {tags?.map((tag, idx) => {
                            if (idx > 0) {
                                return (
                                    <Dropdown.Item key={idx} withDivider>
                                        <div onClick={() => router.push(`/reaction/tags/${tag.safeTitle}`)}>
                                            <Link href={`/reaction/tags/${tag.safeTitle}`} key={tag.title} color="inherit">{tag.title}</Link>
                                        </div>
                                    </Dropdown.Item>
                                )
                            } else {
                                return (
                                    <Dropdown.Item key={idx} >
                                        <div onClick={() => router.push(`/reaction/tags/${tag.safeTitle}`)}>
                                            <Link href={`/reaction/tags/${tag.safeTitle}`} key={tag.title} color="inherit">{tag.title}</Link>
                                        </div>
                                    </Dropdown.Item>
                                )
                            }

                        })}
                    </Dropdown.Menu>
                </Dropdown>


            </Navbar.Collapse>


            {/* <Modal
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
            </Modal> */}

        </Navbar>
    )
}
