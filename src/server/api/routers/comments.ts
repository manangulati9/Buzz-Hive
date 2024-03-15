import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { comments } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const commentsRouter = createTRPCRouter({
  createComment: protectedProcedure.input(z.object({ content: z.string(), postId: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(comments).values({ id: nanoid(), content: input.content, postId: input.postId, userId: ctx.user.id });
  }),

  getPostComments: protectedProcedure.input(z.object({ postId: z.string() })).query(async ({ ctx, input }) => {
    const allComments = await ctx.db.select().from(comments).where(eq(comments.postId, input.postId)).groupBy(comments.id)
    return allComments;
  }),

  deleteCommentById: protectedProcedure.input(z.object({ commentId: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(comments).where(eq(comments.id, input.commentId))
  })
});
