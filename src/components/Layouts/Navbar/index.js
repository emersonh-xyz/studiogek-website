import React, { useEffect, useState } from "react";
import { Navbar, Button, Link, Text, User, Dropdown } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'
import fetchUserTier from "@/utils/fetch_user_tier";

export default function App() {
    const [variant, setVariant] = useState("sticky");
    const [redirectURL, setRedirectURL] = useState();
    const [userTier, setUserTier] = useState();


    const { setTheme } = useNextTheme();
    const { isDark, type } = useTheme();

    const getTier = async () => {
        const results = await fetchUserTier();
        setUserTier(results.data);
    }

    useEffect(() => {
        getTier()
        setRedirectURL(encodeURIComponent(window.location.origin))
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

                <Dropdown>
                    <Dropdown.Button bordered rounded color="gradient" auto >Reactions</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="Attack On Titan"> <Navbar.Link href="/reaction/tags/attack-on-titan">Attack On Titan</Navbar.Link></Dropdown.Item>
                        <Dropdown.Item key="The Mandalorian"> <Navbar.Link href="/reaction/tags/the-mandalorian">The Mandalorian</Navbar.Link></Dropdown.Item>
                        <Dropdown.Item key="The Last Of Us"><Navbar.Link href="/reaction/tags/the-last-of-us">The Last Of Us</Navbar.Link></Dropdown.Item>
                        <Dropdown.Item key="Vinland Sagas"><Navbar.Link href="/reaction/tags/vinland-saga">Vinland Saga</Navbar.Link></Dropdown.Item>
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
                                <User
                                    src={`${session.user.image}`}
                                    name={`${session.user.name}`}
                                    bordered
                                    color="success"
                                    description={userTier?.display} />
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

                    <Button rounded as={Link} href={`/login?redirect_to=${redirectURL}`} auto icon={<Icon icon={"mdi:patreon"} />} color="primary" >
                        Login
                    </Button>
                }

                <Switch
                    checked={isDark}
                    onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                    size="xs"
                    bordered
                    shadow
                    icon={<Icon icon={isDark ? "ph:moon-fill" : "ph:sun-fill"} />}
                />
            </Navbar.Content>
        </Navbar >

    )
}
