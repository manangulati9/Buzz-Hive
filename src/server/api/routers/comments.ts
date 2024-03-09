import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { comments, posts } from "@/server/db/schema";
import { count, eq } from "drizzle-orm";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure.input(z.object({ content: z.string(), postId: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(comments).values({ content: input.content, postId: input.postId, userId: ctx.user.id })
    const [updatedCommentCount] = await ctx.db.select({ value: count() }).from(comments).where(eq(posts.id, input.postId)).groupBy(posts.id);
    return updatedCommentCount ? updatedCommentCount.value : null;
  }),

  getPostComments: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const allComments = await ctx.db.select().from(comments).where(eq(comments.postId, input)).groupBy(comments.postId)
    return allComments;
  }),

  deleteCommentById: protectedProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(comments).where(eq(comments.id, input))
  })
});
