import NextAuth from "next-auth/next";
import PatreonProvider from "next-auth/providers/patreon"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ],
    secret: process.env.JWT_SECRET
}


export default NextAuth(authOptions)