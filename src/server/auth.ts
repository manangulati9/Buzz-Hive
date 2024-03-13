import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { env } from "@/env";
import { db } from "@/server/db";
import { pgTable } from "drizzle-orm/pg-core";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { loginSchema } from "@/lib/zodSchemas";
import bcrypt from "bcrypt"
import { nanoid } from "nanoid";
import { cookies } from 'next/headers'

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
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const adapter = DrizzleAdapter(db, pgTable) as Adapter;

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      }
    },
    signIn: async (opts) => {
      if (opts.account?.provider === "credentials") {
        if (opts.user) {
          const sessionToken = nanoid()
          const sessionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

          if (!adapter.createSession) {
            console.error("Error: Couldn't find createSession callback")
            return false;
          }

          await adapter.createSession({
            sessionToken: sessionToken,
            userId: opts.user.id,
            expires: sessionExpiry,
          });

          const cookieStore = cookies();
          cookieStore.set('next-auth.session-token', sessionToken, {
            expires: sessionExpiry
          })
        }
      }
      return true;
    },
  },
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: env.NEXTAUTH_SECRET,
  adapter,
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
