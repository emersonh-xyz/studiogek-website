import Head from 'next/head';
import { Text, Container, Button, Link, Badge, Modal } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/Utility/LoadingSpinner';
import Navbar from '@/components/Layouts/Navbar/index.js';
import timeAgo from '@/utils/timeAgo';
import { signIn, useSession } from 'next-auth/react';
import hyphenToTitleCase from '@/utils/hyphenToTitleCase';
import { Icon } from '@iconify/react';

export default function Reaction() {

    const [post, setPost] = useState();
    const [nextPostUrl, setNextPostUrl] = useState();
    const [requiredTier, setRequiredTier] = useState();
    const [uncutUnlockDate, setUncutUnlockDate] = useState();

    const [hasAccess, setAccess] = useState();
    const [isLoading, setLoading] = useState(true);
    const [redirectLink, setRedirectLink] = useState();

    const { data: session, status } = useSession()

    const router = useRouter();

    const { id } = router.query;

    // Get the post by query parameters
    const getPost = async (id) => {

        const result = await fetch(`/api/posts/post?id=${id}`)
            .then((res) => res.json())
            .catch((err) => console.log(err));


        // This is some hacky shit I should probably rewrite but oh well
        if (result.status === 401) {
            setAccess(false);
            setRequiredTier(result.data.tier);
            setUncutUnlockDate(result.data.unlockDate);

        } else if (result.status === 200) {
            setAccess(true);
            setPost(result.data[0]);
            setNextPostUrl(result.data.nextPost);
            if (result.data[0].redirectLink?.length > 0) {
                setRedirectLink(result.data[0].redirectLink);
            }
        }

        setLoading(false);

    }

    useEffect(() => {

        // If we haven't loaded yet don't try to use query params
        if (!id) {
            return
        }

        getPost(id)

    }, [id, session])

    return (
        <>
            <title>Studio Gek | Reaction</title>
            <meta property="og:title" content={`Studio Gek | Reaction`} />
            <meta property="og:site_name" content={`🎉 Studio Gek`} />
            <meta
                name="og:description"
                content="This will be dynamic soon...."
            />
            <meta name="theme-color" content="#ffffff" />
            <link rel="icon" href="/favicon.png" />
            <header>
                <Navbar />
            </header>

            <main>


                <Container gap={0} lg  >


                    {hasAccess &&

                        <Container Container css={{ mt: "$10", mb: "$10" }} alignContent='center' justify='center' display='flex' direction='column'>
                            <Text size={20}> {post?.tag?.title} {post?.seasonNumber}x{post?.episodeNumber}</Text>
                            <Text size={18} color="$accents6">Posted {timeAgo(post?.timestamp)}</Text>
                            <Text as={Link} color="primary" href={`/reaction/tags/${post?.tag.safeTitle}`}>Watch more {post?.tag.title}</Text>
                            <Container css={{ mt: "$10", width: "100%", height: "0px", position: "relative", pb: "56.250%" }}>
                                <iframe src={`https://streamable.com/e/${post?.streamableId}`} frameborder="0" width="100%" height="100%" allowFullScreen style={{ width: "100%", height: "100%", position: "absolute", left: "0", top: "0", overflow: "hidden" }}>
                                </iframe>
                            </Container>
                            <Container gap={0} css={{ mt: "$10", d: 'flex', justifyContent: 'right' }}>
                                {nextPostUrl ?
                                    <Button onPress={() => router.push(`/reaction/${nextPostUrl}`)} size={'sm'} auto icon={<Icon icon={'ph:play-fill'} />}>Next Episode</Button>
                                    :
                                    <Button disabled size={'sm'} auto icon={<Icon icon={'ph:play-fill'} />}>Next Episode</Button>
                                }
                            </Container>
                        </Container>
                    }

                    {/*Not logged and no access*/}
                    {!hasAccess && status === "unauthenticated" && !isLoading &&
                        <Container gap={0} display='flex' direction='column' alignItems='center' css={{ p: 20 }} >
                            <Modal
                                preventClose={true}
                                blur
                                aria-labelledby="modal-title"
                                open={true}

                            >
                                <Modal.Header>
                                    <Text id="modal-title" size={20}>
                                        403 Forbidden
                                    </Text>
                                </Modal.Header>
                                <Modal.Body>
                                    <Text css={{ ta: 'center' }}>You must be logged in to view this content</Text>
                                </Modal.Body>
                                <Modal.Footer css={{ d: 'flex', justifyContent: "center" }}>
                                    <Button onPress={() => signIn('patreon')} flat icon={<Icon width={20} icon="mdi:user" />} auto color="success" >
                                        Login
                                    </Button>
                                    <Button onPress={() => router.push('/')} flat icon={<Icon width={20} icon="mdi:home" />} auto color="primary" >
                                        Home
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Container>

                    }


                    {/*Not logged and no access*/}
                    {redirectLink &&
                        <Container gap={0} display='flex' direction='column' alignItems='center' css={{ p: 20 }} >
                            <Modal
                                closeButton
                                preventClose={false}
                                blur
                                aria-labelledby="modal-title"
                                open={true}

                            >
                                <Modal.Header>
                                    <Text id="modal-title" size={18}>
                                        {post?.tag?.title} {post?.seasonNumber}x{post?.episodeNumber} is only avaliable on Patreon
                                    </Text>
                                </Modal.Header>

                                <Modal.Body css={{ d: 'flex', flexDirection: "column", }}>
                                    <Button css={{ backgroundColor: "#FF424D" }} flat auto icon={<Icon color='white' width={20} icon="mdi:patreon" />}>
                                        <Link css={{ color: "white" }} href={redirectLink} target='_blank'>
                                            View on Patreon
                                        </Link>
                                    </Button>
                                    <Button onPress={() => router.push('/')} flat icon={<Icon width={20} icon="mdi:home" />} auto color="white" >
                                        Home
                                    </Button>
                                </Modal.Body>
                            </Modal>
                        </Container>

                    }


                    {/* Loading state*/}
                    {isLoading &&

                        <Container css={{ d: "flex", justifyContent: "center", alignItems: "center" }}>
                            <LoadingSpinner css={{}} />
                        </Container>

                    }

                    {/* Logged in but don't have access*/}
                    {!hasAccess && status === "authenticated" && !isLoading &&
                        <>
                            <Text>
                                <Container gap={0} display='flex' direction='column' alignItems='center' css={{ p: 20 }} >
                                    <Modal
                                        preventClose={true}
                                        blur
                                        aria-labelledby="modal-title"
                                        open={true}
                                    >
                                        <Modal.Header>
                                            <Text id="modal-title" size={20}>
                                                403 Forbidden
                                            </Text>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Text css={{ ta: 'center   ' }}>You must be <Text b>{requiredTier}</Text> to view this content</Text>
                                            <Text css={{ ta: 'center   ' }}>This post unlocks on <Text css={{ color: "$primary" }} b>{uncutUnlockDate} EST</Text> for <Text b>Uncut Tier</Text></Text>
                                        </Modal.Body>
                                        <Modal.Footer css={{ d: 'flex', justifyContent: "center" }}>
                                            <Button onPress={() => router.push('/')} flat icon={<Icon width={20} icon="mdi:home" />} auto color="primary" >
                                                Home
                                            </Button>
                                            <a href="https://www.patreon.com/studiogek" target='blank'>
                                                <Button flat auto color="warning" icon={<Icon width={20} icon="mdi:patreon" />}>
                                                    Join Patreon
                                                </Button>
                                            </a>
                                        </Modal.Footer>
                                    </Modal>
                                </Container>
                            </Text>


                            <Container Container css={{ mt: "$10", mb: "$10" }} alignContent='center' justify='center' display='flex' direction='column'>
                                <Text size={20}> Post Title Season Number Episode Number</Text>
                                <Text size={18} color="$accents6">Posted </Text>
                                <Text as={Link} color="primary" href={`/reaction/tags/${post?.tag.safeTitle}`}>Watch more {post?.tag.title}</Text>
                                <Container >
                                    <img width={1920} height={1080} src="https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2022/12/15/chainsaw-man-anime-pv3.jpg" />
                                </Container>

                            </Container>
                        </>


                    }

                </Container>


            </main >

            <footer>

            </footer>

        </>
    )
}
