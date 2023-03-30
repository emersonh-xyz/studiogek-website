import NextAuth from "next-auth/next";
import PatreonProvider from "next-auth/providers/patreon"

export const authOptions = {
    providers: [
        // DiscordProvider({
        //     clientId: process.env.DISCORD_CLIENT_ID,
        //     clientSecret: process.env.DISCORD_CLIENT_SECRET
        // }),
        PatreonProvider({
            clientId: process.env.PATREON_CLIENT_ID,
            clientSecret: process.env.PATREON_CLIENT_SECRET
        })
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt(token, user, account = {}, profile, isNewUser) {

            if (account.provider && !token[account.provider]) {
                token[account.provider] = {};

            }

            if (account.accessToken) {
                token[account.provider].accessToken = account.accessToken;
            }

            if (account.refreshToken) {
                token[account.provider].refreshToken = account.refreshToken;
            }

            return token
        }
    }
}


export default NextAuth(authOptions)