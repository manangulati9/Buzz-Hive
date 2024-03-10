import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { comments, posts } from "@/server/db/schema";
import { count, eq } from "drizzle-orm";

export const commentsRouter = createTRPCRouter({
  createComment: protectedProcedure.input(z.object({ content: z.string(), postId: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(comments).values({ content: input.content, postId: input.postId, userId: ctx.user.id })
    const [updatedCommentCount] = await ctx.db.select({ value: count() }).from(comments).where(eq(posts.id, input.postId)).groupBy(posts.id);
    return updatedCommentCount ? updatedCommentCount.value : null;
  }),

  commentsCount: protectedProcedure.input(z.object({ postId: z.number() })).query(async ({ ctx, input }) => {
    const [commentsCount] = await ctx.db.select({ value: count() }).from(comments).where(eq(comments.postId, input.postId)).groupBy(comments.postId);
    return commentsCount ? commentsCount.value : null;
  }),

  getPostComments: protectedProcedure.input(z.object({ postId: z.number() })).query(async ({ ctx, input }) => {
    const allComments = await ctx.db.select().from(comments).where(eq(comments.postId, input.postId)).groupBy(comments.postId)
    return allComments;
  }),

  deleteCommentById: protectedProcedure.input(z.object({ commentId: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(comments).where(eq(comments.id, input.commentId))
  })
});
