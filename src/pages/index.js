import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useSession, signOut, signIn } from 'next-auth/react'
import Navbar from '@/components/Layouts/Navbar';
import PostCard from '@/components/Content/Patreon/PostCard';
import fetchUserTier from '@/utils/fetch_user_tier';
import fetchCampaignPosts from '@/utils/fetch_campaign_posts'
import { useRouter } from 'next/router';
import { Container, Card, Row, Text, Grid, Badge } from "@nextui-org/react";
import LoadingSpinner from '@/components/Utility/LoadingSpinner';
import DiscordWidget from '@/components/Utility/DiscordWidget'
import PatreonContent from '@/components/Content/Patreon';
import YoutubeContent from '@/components/Content/Youtube';
import ArtContent from '@/components/Content/FanArt';
import Home from '@/components/Layouts/Pages/Home/Home.js'

export default function App() {

  const { data: session, status } = useSession()

  const [userTier, setUserTier] = useState();
  const [postData, setPostData] = useState([]);
  const [authed, setAuthed] = useState();

  const router = useRouter();

  // Get the current tier of the user
  const getTier = async () => {
    const results = await fetchUserTier();
    setUserTier(results);
  }

  useEffect(() => {

    // Call our asyncronous functions
    getTier()

    return () => {
      // this now gets called when the component unmounts
    }


  }, [])
  // Loop over all post data

  return (
    <div>
      <Head>
        <title>Studio Gek | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <Home />

      </main >


    </div >
  )
}