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
        async jwt({ token, account, profile, user }) {

            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id

            }
            return token;
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id

            return session
        },

        // async signIn(user, account, profile) {


        //     console.log(user)

        //     if (user.account.provider === 'patreon') {
        //         const tier = await getTierId(user)
        //         console.log(tier);

        //         return {
        //             ...user,
        //             tier,
        //         }
        //     }
        // }

    }

}


export default NextAuth(authOptions)