import Head from 'next/head';
import { Text, Container, Button, Link, Badge } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/Utility/LoadingSpinner';
import Navbar from '@/components/Layouts/Navbar/index.js';
import timeAgo from '@/utils/timeAgo';
import { Icon } from '@iconify/react';
import { signIn, useSession } from 'next-auth/react';
import hyphenToTitleCase from '@/utils/hyphenToTitleCase';

export default function Reaction() {

    const [post, setPost] = useState();
    const [requiredTier, setRequiredTier] = useState();

    const [hasAccess, setAccess] = useState();
    const [isLoading, setLoading] = useState(true);
    const [redirectUrl, setRedirectURL] = useState();

    const { data: session, status } = useSession()

    const router = useRouter();

    const { id } = router.query;

    // Get the post by query parameters
    const getPost = async (id) => {


        const result = await fetch(`/api/posts/post?id=${id}`)
            .then((res) => res.json())
            .catch((err) => console.log(err));



        if (result.status === 401) {
            setAccess(false);
            setRequiredTier(result.data)
        } else if (result.status === 200) {
            setAccess(true)
            setPost(result.data[0])
        }

        setLoading(false)

    }

    useEffect(() => {

        if (!id) {
            return
        }

        getPost(id)

        setRedirectURL()


    }, [id])



    return (
        <>
            <Head>
                <title>Studio Gek | Post</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <header>
                <Navbar />
            </header>

            <main>


                <Container gap={0} lg  >


                    {hasAccess &&

                        <Container Container css={{ mt: "$10", mb: "$10" }} alignContent='center' justify='center' display='flex' direction='column'>
                            <Text size={20}> {post?.title} {post?.seasonNumber}x{post?.episodeNumber}</Text>
                            <Text size={18} color="$accents6">Posted {timeAgo(post?.timestamp)}</Text>
                            <Text as={Link} color="primary" href={`/reaction/tags/${post?.tag.safeTitle}`}>Watch more {post?.tag.title}</Text>
                            <Container css={{ mt: "$10", width: "100%", height: "0px", position: "relative", pb: "56.250%" }}>
                                <iframe src={`https://streamable.com/e/${post?.streamableId}`} frameborder="0" width="100%" height="100%" allowFullScreen style={{ width: "100%", height: "100%", position: "absolute", left: "0", top: "0", overflow: "hidden" }}>
                                </iframe>
                            </Container>

                        </Container>
                    }

                    {!hasAccess && status === "authenticated" && !isLoading &&
                        <Container gap={0} display='flex' direction='column' alignItems='center' css={{ p: 20 }} >
                            <Badge size="lg" isSquared color="error">
                                Hey this post requires a Patron tier of {requiredTier} or higher to view
                            </Badge>
                            <Button target="_blank" as={Link} href="https://www.patreon.com/studiogek" css={{ mt: 14 }}>Join Patreon</Button>
                        </Container>

                    }

                    {isLoading &&

                        <Container css={{ d: "flex", justifyContent: "center", alignItems: "center" }}>
                            <LoadingSpinner css={{}} />
                        </Container>

                    }

                    {status === "unauthenticated" && post?.tier.id !== "0000000" &&
                        <>
                            <Text>
                                Please login to view the requested content
                            </Text>

                        </>
                    }

                </Container>


            </main >

            <footer>

            </footer>

        </>
    )
}
