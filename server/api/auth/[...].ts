import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import DbAuthManager from '~/server/managers/db/authManager'
import User from '~/models/user';
import bcrypt from "bcryptjs";

export default NuxtAuthHandler({
  secret: process.env.SECRET_FOR_HASH_PASSWORD,

  pages: {
    signIn: '/login'
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user ? user.id || '' : '';
        token.isAdministrator = user ? (user as User).isAdministrator || false : false;
      }
      return Promise.resolve(token);
    },
    session: async ({ session, token }) => {
      (session as any).uid = token.id;
      (session as any).isAdministrator = token.isAdministrator;
      return Promise.resolve(session);
    },
  },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials: { email: string, password: string }) {
        const authManager = DbAuthManager.getInstance();
        const user: User | null = await authManager.findOne(credentials as User);

        if (user != null) {
          if (await bcrypt.compare(credentials.password, user.password || "")) {
            const u = {
              id: user._id,
              name: user.name,
              email: user.email,
              isAdministrator: user.isAdministrator,
            }
            return u;
          }
        }

        console.error("Invalid email or password");
        return null;
      }
    })
  ],

})
