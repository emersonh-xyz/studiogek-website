import NextAuth from "next-auth/next";
import PatreonProvider from "next-auth/providers/patreon"


export const authOptions = {
    providers: [
        {
            id: "patreon",
            name: "Patreon",
            type: "oauth",
            version: "2.0",
            authorization: {
                url: "https://www.patreon.com/oauth2/authorize",
                params: { scope: "identity identity[email] campaigns identity.memberships" },
            },
            token: "https://www.patreon.com/api/oauth2/token",
            userinfo: "https://www.patreon.com/api/oauth2/api/current_user",
            async profile(profile) {
                return {
                    id: profile.data.id,
                    name: profile.data.attributes.full_name,
                    email: profile.data.attributes.email,
                    image: profile.data.attributes.image_url,
                }
            },
            style: {
                logo: "/patreon.svg",
                logoDark: "/patreon.svg",
                bg: "#fff",
                text: "#e85b46",
                bgDark: "#000",
                textDark: "#e85b46",
            },
            clientId: process.env.PATREON_CLIENT_ID,
            clientSecret: process.env.PATREON_CLIENT_SECRET
        }
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile, user }) {

            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }

            if (user) {
                const administrators = ['emersonhicks003@gmail.com']
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