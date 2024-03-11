import { signUpSchema } from "@/lib/zodSchemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import bcrypt from "bcrypt";

export const authRouter = createTRPCRouter({
  signUpWithEmail: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    const result = await ctx.db.select().from(users).where(eq(users.email, input.email));

    if (result.length > 0) throw new TRPCError({ message: "User already exists", code: "CONFLICT" })

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = {
      name: input.name,
      email: input.email,
      username: input.username,
      passwordHash: hashedPassword,
      id: nanoid(),
    } satisfies typeof users.$inferInsert

    await ctx.db.insert(users).values(newUser)
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
});
