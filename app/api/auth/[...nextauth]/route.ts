import NextAuth, {AuthOptions as NextAuthOptions} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    })
  ],
  // callbacks: {
  //   jwt({ token, account, user }) {
  //     if (account) {
  //       token.accessToken = account.access_token
  //       console.log(user)
  //       token.id = user?.id
  //     }
  //     return token
  //   },
  //   session({ session, token }) {
  //     // I skipped the line below coz it gave me a TypeError
  //     // session.accessToken = token.accessToken;
  //     console.log(token)
  //     console.log(session)
  //     if (token?.id) {
  //       session.user.id = token.id;
  //     }
  //
  //     return session;
  //   },
  // }
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
