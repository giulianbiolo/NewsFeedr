import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import DbAuthManager from '~/server/managers/db/authManager'
import User from '~/models/user';
import bcrypt from "bcryptjs";

export default NuxtAuthHandler({
  // TODO: mettere nel file .env
  secret: "codice super segreto",

  pages: {
    signIn: '/login'
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
        const user = await authManager.findOne(credentials as User);

        if (user != null) {
          if (await bcrypt.compare(credentials.password, user.password || "")) {
            return user;
          }
        }

        console.error("Invalid email or password");
        return null;
      }
    })
  ],
})
