import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        // ...add more providers here
    ],
    callbacks: {
        // assign the provider account id to the token id
        async jwt({ token, account }) {
            if (account) {
                token.id = account.providerAccountId;
            }
            return token;
        },
        // assign the provider account id to the session user id
        async session({ session, token }) {
            if (token.id && session.user) {
                const customUser = session.user as types.User;
                customUser.id = token.id as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
