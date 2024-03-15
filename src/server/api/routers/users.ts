import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";

export const usersRouter = createTRPCRouter({
  userById: protectedProcedure.input(z.object({ userId: z.string() }).optional()).query(async ({ ctx, input = { userId: ctx.user.id } }) => {
    const [userData] = await ctx.db.select().from(users).where(eq(users.id, input.userId));
    return userData!;
  })
});
