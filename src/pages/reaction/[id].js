import Head from 'next/head';
import { Text, Container, Button, Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/Utility/LoadingSpinner';
import Navbar from '@/components/Layouts/Navbar/index.js';
import timeAgo from '@/utils/timeAgo';
import { Icon } from '@iconify/react';
import { signIn, useSession } from 'next-auth/react';

export default function Reaction() {

    const [post, setPost] = useState();
    const [requiredTier, setRequiredTier] = useState();

    const [hasAccess, setAccess] = useState();
    const [isLoading, setLoading] = useState(false);
    const [redirectUrl, setRedirectURL] = useState();

    const { data: session, status } = useSession()

    const router = useRouter();
    const { id } = router.query;

    const getPost = async (id) => {
        const result = await fetch(`/api/posts/post?id=${id}`)
            .then((res) => res.json())
            .catch((err) => alert(err));

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


        if (status === "authenticated") {
            getPost(id)
        }

        setRedirectURL()


    }, [id])


    if (isLoading) {
        return (
            <Container css={{ d: "flex", justifyContent: "center", alignItems: "center" }}>
                <LoadingSpinner css={{}} />
            </Container>
        )
    }

    if (status === "unauthenticated") {
        router.push(`/login`);
    }


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

                <Container gap={0} lg>

                    {session &&

                        hasAccess ?

                        <Container css={{ mt: "$10", mb: "$10" }} alignContent='center' justify='center' display='flex' direction='column'>
                            <Text h1 b> {post?.title}</Text>
                            <Text h4>Posted {timeAgo(post?.timestamp)}</Text>
                            <Container css={{ mt: "$10", width: "100%", height: "0px", position: "relative", pb: "56.250%" }}>
                                <iframe src={`https://streamable.com/e/${post?.streamableId}`} frameborder="0" width="100%" height="100%" allowfullscreen style={{ width: "100%", height: "100%", position: "absolute", left: "0", top: "0", overflow: "hidden" }}>
                                </iframe>
                            </Container>
                        </Container>

                        :

                        <div>
                            <Text h1>You must be {requiredTier} to view this content</Text>
                            <Button target='_blank' rounded as={Link} href={`https://www.patreon.com/studiogek/membership`} auto icon={<Icon icon={"mdi:patreon"} />} color="primary" >
                                Join Patreon
                            </Button>
                        </div>

                    }

                </Container>


            </main >

            <footer>

            </footer>

        </>
    )
}
