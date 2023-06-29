import NextAuth from "next-auth/next";
import PatreonProvider from "next-auth/providers/patreon"


export const authOptions = {
    providers: [
        PatreonProvider({
            clientId: process.env.PATREON_CLIENT_ID,
            clientSecret: process.env.PATREON_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile, user }) {

            // Aquire our token & id from account inormation
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id

            }

            // Sets an isAdmin to True / False if they exist in the user list
            if (user) {
                const administrators = ['emersonhicks003@gmail.com', 'ehicks23@uncc.edu']
                if (administrators.includes(user?.email)) {
                    token.role = "admin"
                }
            }

            return token;
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id

            return session
        },

    }

}


export default NextAuth(authOptions)