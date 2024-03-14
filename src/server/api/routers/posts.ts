import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { postImages, posts } from "@/server/db/schema";
import { nanoid } from 'nanoid'
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const postsRouter = createTRPCRouter({
  getAllPosts: protectedProcedure.input(z.object({ page: z.number() })).query(async ({ ctx, input }) => {
    const postsArr = await ctx.db.select().from(posts).orderBy(posts.id).limit(10);
    return postsArr;
  }),

  createPost: protectedProcedure.input(z.object({ content: z.string(), fileList: z.array(z.object({ url: z.string(), filename: z.string() }).optional()) })).mutation(async ({ ctx, input }) => {
    const userId = ctx.user.id;
    const [newPosts] = await ctx.db.insert(posts).values({ id: nanoid(), content: input.content, authorId: userId }).returning({ id: posts.id });

    if (!newPosts) {
      throw new TRPCError({ message: "Couldn't get post id", code: "NOT_FOUND" });
    }

    for (const file of input.fileList) {
      if (file) {
        await ctx.db.insert(postImages).values({ id: nanoid(), url: file.url, filename: file.filename, postId: newPosts.id });
      }
    }
  }
  ),

  deletePost: protectedProcedure.input(z.object({ postId: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(posts).where(eq(posts.id, input.postId));
  }),

  postImages: protectedProcedure.input(z.object({ postId: z.string() })).query(async ({ ctx, input }) => {
    const images = await ctx.db.select().from(postImages).orderBy(postImages.createdAt).where(eq(postImages.postId, input.postId))
    return images;
  })
});
