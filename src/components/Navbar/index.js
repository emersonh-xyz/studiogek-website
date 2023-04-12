import React, { useEffect, useState } from "react";
import { Navbar, Button, Link, Text, User, Dropdown } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default function App() {
    const [variant, setVariant] = useState("floating");
    const [redirectURL, setRedirectURL] = useState();

    useEffect(() => {
        setRedirectURL(encodeURIComponent(window.location.origin))
    }, [])

    const { data: session } = useSession()

    const variants = ["static", "floating", "sticky"];

    return (
        <Navbar isBordered variant={variant}>
            <Navbar.Brand>

                <Image width={50} height={50} src="/static/logo_white.png"></Image>
                <Text b color="inherit" hideIn="sm">
                    Studio Gek
                </Text>

            </Navbar.Brand>
            <Navbar.Content hideIn="xs">


                <Navbar.Link href="#">Patreon</Navbar.Link>
                <Dropdown>
                    <Dropdown.Button bordered rounded color="gradient" auto >Reactions</Dropdown.Button>
                    <Dropdown.Menu aria-label="Static Actions">
                        <Dropdown.Item key="Attack On Titan"> <Navbar.Link href="#">Attack On Titan</Navbar.Link></Dropdown.Item>
                        <Dropdown.Item key="The Mandalorian">The Mandalorian</Dropdown.Item>
                        <Dropdown.Item key="The Last Of Us">The Last Of Us</Dropdown.Item>
                        <Dropdown.Item key="Vinland Sagas">Vinland Saga</Dropdown.Item>


                    </Dropdown.Menu>
                </Dropdown>
                <Navbar.Link href="#">Merchandise</Navbar.Link>



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
                                    description="Gek Tier" />
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


            </Navbar.Content>
        </Navbar >

    )
}
