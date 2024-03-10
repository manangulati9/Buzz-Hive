import { loginSchema, signUpSchema } from "@/lib/zodSchemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { createClient } from "@/server/auth/server";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

export const authRouter = createTRPCRouter({
  loginWithEmail: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(input);

    if (error) {
      redirect('/error')
    } else {
      redirect('/dashboard')
    }
  }),

  signUpWithEmail: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    try {
      const supabase = createClient();

      const { data: { user }, error } = await supabase.auth.signUp({
        email: input.email, password: input.password, options: {
          data: {
            name: input.name,
            username: input.username,
          },
        }
      })

      if (error) {
        throw new Error(error.message);
      }

      if (user) {
        const newUser = {
          name: input.name,
          email: input.email,
          username: input.username,
          id: user.id,
        } satisfies typeof users.$inferInsert

        await ctx.db.insert(users).values(newUser)
      }
    } catch (error) {
      console.error(error)
    }
  }),

  isUsernameAvailable: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    try {
      const result = await ctx.db.select().from(users).where(eq(users.username, input));

      if (result.length > 0) return false

      return true;
    } catch (error) {
      console.error(error)
      return null;
    }
  }),

  // TODO: Add procedure to store OAuth user details to db
});
