import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { createClient } from "@/server/auth/server";
import { redirect } from "next/navigation";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const loginSchema = z.object({
  email: z.string().email("Invalid email id"),
  password: z.string().min(8, "Password is too short").max(25, "Password length exceeded")
})

export const signUpSchema = loginSchema.extend({
  name: z.string(),
  username: z.string().min(1, "Username is too short").max(12, "Username length exceeded"),
  confirmPassword: z.string().min(8, "Password is too short").max(25, "Password length exceeded"),
}).refine((val) => val.password === val.confirmPassword, { message: "Passwords don't match" })

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

  signUpWithEmail: publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    try {
      const supabase = createClient();

      const { error, data } = await supabase.auth.signUp({ email: input.email, password: input.password })

      if (error) {
        throw new Error(error.message)
      }

      const newUser = {
        name: input.name,
        email: input.email,
        username: input.username,
      } satisfies typeof users.$inferInsert

      await ctx.db.insert(users).values(newUser)

      return data.user;
    } catch (error) {
      console.error(error)
      return null;
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
  })
});
