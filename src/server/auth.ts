import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/env";
import { db } from "@/server/db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { loginSchema } from "@/lib/zodSchemas";
import bcrypt from "bcrypt"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => {
      session.user.id = token.userId;
      return session;
    },
    jwt: ({ token, account }) => {
      if (account && account.type === "credentials") {
        token.userId = account.providerAccountId;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("Error: Credentials not found")
          return null;
        }

        const result = loginSchema.safeParse(credentials)

        if (!result.success) {
          console.error("Error: Schema parsing failed.")
          return null;
        }

        const validatedCreds = result.data;

        const [user] = await db.select().from(users).where(eq(users.email, validatedCreds.email));

        if (!user ?? !user?.passwordHash) {
          console.error("Error: Couldn't get the user from database.")
          return null;
        }

        const passwordsMatch = await bcrypt.compare(validatedCreds.password, user.passwordHash);

        if (!passwordsMatch) {
          console.error("Error: Passwords don't match.")
          return null;
        }

        console.log("Authorization successfull!")
        return user;
      }
    })
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
