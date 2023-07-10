import Head from 'next/head';
import { Text, Container } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/Utility/LoadingSpinner';
import Navbar from '@/components/Layouts/Navbar/index.js';
import Tags from '@/components/Layouts/Pages/Tags/Tags.js'

export default function Reaction() {


    return (
        <>
            <Head>
                <title>Studio Gek | Reactions</title>
                <meta property="og:title" content={`Studio Gek | Reactions`} />
                <meta property="og:site_name" content={`🎉 Studio Gek`} />
                <meta
                    name="og:description"
                    content="View and browse exclusive patron content"
                />
                <meta name="theme-color" content="#ffffff" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <main>
                <Tags />
            </main>

        </>
    )
}
