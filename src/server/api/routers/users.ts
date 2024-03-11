import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const [userData] = await ctx.db.select().from(users).where(eq(users.id, ctx.user.id));
    return userData!;
  })
});
