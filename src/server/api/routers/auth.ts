import { signUpSchema, usernameSchema } from "@/lib/zodSchemas";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { z } from "zod";

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

    const [createdUser] = await ctx.db.insert(users).values(newUser).returning();

    if (!createdUser) {
      throw new TRPCError({ message: "Unable to create new user", code: "UNPROCESSABLE_CONTENT" });
    }
  }),

  isUsernameAvailable: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const parseResult = usernameSchema.safeParse(input);

    if (!parseResult.success) {
      throw new TRPCError({ message: parseResult.error.flatten().formErrors[0], code: "UNPROCESSABLE_CONTENT" })
    }

    const result = await ctx.db.select().from(users).where(eq(users.username, input));

    if (result.length > 0) {
      throw new TRPCError({ message: `${input} already exists.`, code: "CONFLICT" })
    }

    return true;
  }),
});
