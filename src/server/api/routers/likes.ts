import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { count, eq, and } from "drizzle-orm";
import { likes } from "@/server/db/schema";
import { nanoid } from "nanoid";

export const likesRouter = createTRPCRouter({
  likesCount: protectedProcedure.input(z.object({ postId: z.string() })).query(async ({ ctx, input }) => {
    const [likesCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, input.postId)).groupBy(likes.postId);
    return likesCount ? likesCount.value : null;
  }),

  likePost: protectedProcedure.input(z.object({ postId: z.string() })).mutation(async ({ ctx, input }) => {
    const [createdLike] = await ctx.db.insert(likes).values({ id: nanoid(), authorId: ctx.user.id, postId: input.postId, }).returning({ likeId: likes.id })
    const [updatedLikeCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, input.postId)).groupBy(likes.postId);
    const likeData = {
      likeId: createdLike ? createdLike.likeId : "",
      likeCount: updatedLikeCount ? updatedLikeCount.value : 0,
    }
    return likeData
  }),

  isLiked: protectedProcedure.input(z.object({ postId: z.string() })).query(async ({ ctx, input }) => {
    const didLikeQuery = await ctx.db.select().from(likes).where(and(eq(likes.authorId, ctx.user.id), eq(likes.postId, input.postId)))
    return didLikeQuery.length > 0;
  }),

  unlikePost: protectedProcedure.input(z.object({ likeId: z.string(), postId: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(likes).where(eq(likes.id, input.likeId))
    const [updatedLikeCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, input.postId)).groupBy(likes.postId);
    return updatedLikeCount ? updatedLikeCount.value : null;
  })
});
