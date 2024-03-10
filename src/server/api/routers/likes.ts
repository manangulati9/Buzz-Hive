import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { count, eq } from "drizzle-orm";
import { likes } from "@/server/db/schema";

export const likesRouter = createTRPCRouter({
  likesCount: protectedProcedure.input(z.object({ postId: z.number() })).query(async ({ ctx, input }) => {
    const [likesCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, input.postId)).groupBy(likes.postId);
    return likesCount ? likesCount.value : null;
  }),

  likePost: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(likes).values({ authorId: ctx.user.id, postId: input, })
    const [updatedLikeCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, input)).groupBy(likes.postId);
    return updatedLikeCount ? updatedLikeCount.value : null;
  }),
});
