import { signUpSchema } from "@/lib/zodSchemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { accounts, users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";
import bcrypt from "bcrypt";
import { adapter } from "@/server/auth";

export const authRouter = createTRPCRouter({
  signUpWithEmail: publicProcedure.input(signUpSchema).mutation(async ({ input, ctx }) => {
    if (!adapter.createSession) {
      throw new TRPCError({ code: "NOT_IMPLEMENTED" })
    }

    const result = await ctx.db.select().from(users).where(eq(users.email, input.email));

    if (result.length > 0) throw new TRPCError({ message: "User already exists", code: "CONFLICT" })

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = {
      name: input.name,
      email: input.email,
      username: input.username,
      passwordHash: hashedPassword,
      id: nanoid(),
      emailVerified: new Date()
    } satisfies typeof users.$inferInsert

    const [createdUser] = await ctx.db.insert(users).values(newUser).returning({ userId: users.id });

    if (!createdUser) {
      throw new TRPCError({ message: "Unable to create new user", code: "UNPROCESSABLE_CONTENT" });
    }

    const newAccount = {
      userId: createdUser.userId,
      type: "credential",
      provider: "credentails",
      providerAccountId: createdUser.userId,
    } satisfies typeof accounts.$inferInsert

    const [createdAccount] = await ctx.db.insert(accounts).values(newAccount).returning();

    if (!createdAccount) {
      throw new TRPCError({ message: "Unable to link account to created user profile", code: "INTERNAL_SERVER_ERROR" })
    }
  }),

  isUsernameAvailable: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const result = await ctx.db.select().from(users).where(eq(users.username, input));

    if (result.length > 0) {
      throw new TRPCError({ message: `${input} already exists.`, code: "CONFLICT" })
    }

    return true;
  }),
});
