import React, { useEffect, useState } from "react";
import { Navbar, Button, Link, Text, User, Dropdown, Avatar } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'

export default function App() {
    const [variant, setVariant] = useState("sticky");
    const [redirectURL, setRedirectURL] = useState();
    const [tags, setTags] = useState([]);
    const [userTier, setUserTier] = useState();


    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    const getAllTags = async () => {
        const results = await fetch("/api/tags/all")
            .then((res) => res.json());
        setTags(results.data);
        console.log(results)
    }

    useEffect(() => {
        getAllTags();
    }, [])

    const { data: session } = useSession()

    return (
        <Navbar isBordered variant={variant}>
            <Navbar.Brand>
                <Image width={50} height={50} src={isDark ? "/static/logo_white.png" : "/static/logo_black.png"}></Image>
                <Text href="/" as={Link} b color="inherit" hideIn="sm">
                    Studio Gek
                </Text>

            </Navbar.Brand>
            <Navbar.Content hideIn="xs">


                <Navbar.Link target="_blank" href="https://www.patreon.com/studiogek/">Patreon</Navbar.Link>
                <Navbar.Link target="_blank" href="https://discord.gg/studiogek">Discord</Navbar.Link>

                <Dropdown >
                    <Dropdown.Button light>Full Length</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        {tags?.map((tag) => {
                            return (
                                <Dropdown.Item key={tag.title}> <Navbar.Link href={`/reaction/tags/${tag.safeTitle}`}>{tag.title}</Navbar.Link></Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <Navbar.Link href="#fan-art">Fan Art</Navbar.Link>
                <Navbar.Link target="_blank" href="https://shop.studiogekyt.com/">Shop</Navbar.Link>

            </Navbar.Content>


            <Navbar.Content>
                {session ?
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    auto
                                    size="md"
                                    src={session.user.image}
                                    color="primary"
                                    bordered
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="primary">
                            <Dropdown.Item key="profile" css={{ height: "$18" }}>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: "flex" }}>
                                    {session.user.email}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item key="logout" withDivider color="error">
                                <Text onClick={() => signOut()}>Log Out</Text>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    :

                    <Button onClick={() => signIn("patreon")} rounded auto icon={<Icon icon={"mdi:patreon"} />} color="primary" >
                        Login
                    </Button>
                }

                <Switch
                    checked={isDark}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    size="xs"


                    icon={<Icon icon={isDark ? "ph:moon-fill" : "ph:sun-fill"} />}
                />
            </Navbar.Content>
        </Navbar >

    )
}
