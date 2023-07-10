import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import fetchUserTier from '@/utils/fetch_user_tier';
import { useRouter } from 'next/router';
import Home from '@/components/Layouts/Pages/Home/Home.js'

export default function App() {

  const { data: session, status } = useSession()

  const router = useRouter();

  // const getAllTiers = async () => {
  //   const results = await fetch('/api/patreon/campaign/tiers')
  //     .then((res) => res.json())
  //     .catch((err) => console.log(err))

  //   console.log(results)

  // }

  useEffect(() => {

    // getAllTiers()

    return () => {
      // this now gets called when the component unmounts
    }


  }, [])
  // Loop over all post data

  return (
    <div>
      <Head>
        <title>Studio Gek | Home</title>
        <meta property="og:title" content={`Studio Gek | Home`} />
        <meta property="og:site_name" content={`🎉 Studio Gek`} />
        <meta
          name="og:description"
          content="View and browse exclusive patron content"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>

        <Home />

      </main >


    </div >
  )
}