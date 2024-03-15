import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { comments, likes, postImages, posts, users } from "@/server/db/schema";
import { nanoid } from 'nanoid'
import { TRPCError } from "@trpc/server";
import { count, desc, eq } from "drizzle-orm";

export const postsRouter = createTRPCRouter({
  allPosts: protectedProcedure.input(z.object({ page: z.number() })).query(async ({ ctx, input }) => {
    const postsArr = await ctx.db.select().from(posts).orderBy(desc(posts.createdAt)).limit(10).offset(input.page * 10);

   const postsData =  await Promise.all(postsArr.map(async(post) => {
    const [commentCount] = await ctx.db.select({ value: count() }).from(comments).where(eq(comments.postId, post.id)).groupBy(comments.postId); // Fetching comment count
    const images = await ctx.db.select().from(postImages).orderBy(postImages.createdAt).where(eq(postImages.postId, post.id)); // Fetching post images
    const [likeCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, post.id)).groupBy(likes.postId); // Fetching post like count
    const [userData] = await ctx.db.select().from(users).where(eq(users.id, post.authorId));

    if (!userData) {
      throw new TRPCError({ message: "Couldn't fetch user metadata for this post", code: "NOT_FOUND" })
    }

    return {
      ...post,
      userData,
      commentCount: commentCount ? commentCount.value : 0,
      imagesArray: images,
      likeCount: likeCount ? likeCount.value : 0,
    }

  }))

    return postsData;
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

  postById: protectedProcedure.input(z.object({ postId: z.string() })).query(async ({ ctx, input }) => {
    const [post] = await ctx.db.select().from(posts).where(eq(posts.id, input.postId))

    if (!post) {
      throw new TRPCError({ message: "Post with given id doesn't exist", code: "NOT_FOUND" })
    }

    const [commentCount] = await ctx.db.select({ value: count() }).from(comments).where(eq(comments.postId, post.id)).groupBy(comments.postId); // Fetching comment count
    const images = await ctx.db.select().from(postImages).orderBy(postImages.createdAt).where(eq(postImages.postId, post.id)); // Fetching post images
    const [likeCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, post.id)).groupBy(likes.postId); // Fetching post like count
    const [userData] = await ctx.db.select().from(users).where(eq(users.id, post.authorId));

    if (!userData) {
      throw new TRPCError({ message: "Couldn't fetch user metadata for this post", code: "NOT_FOUND" })
    }

    const postData = {
      ...post,
      userData,
      commentCount: commentCount ? commentCount.value : 0,
      imagesArray: images,
      likeCount: likeCount ? likeCount.value : 0,
    }

    return postData;
  }),

  postByUserId: protectedProcedure.input(z.object({ userId: z.string() }).optional()).query(async ({ ctx, input = { userId: ctx.user.id } }) => {
    const userPosts = await ctx.db.select().from(posts).where(eq(posts.authorId, input.userId))

    if (!userPosts) {
      throw new TRPCError({ message: "Post with given user id doesn't exist", code: "NOT_FOUND" })
    }

    const postsData =  await Promise.all(userPosts.map(async(post) => {
      const [commentCount] = await ctx.db.select({ value: count() }).from(comments).where(eq(comments.postId, post.id)).groupBy(comments.postId); // Fetching comment count
      const images = await ctx.db.select().from(postImages).orderBy(postImages.createdAt).where(eq(postImages.postId, post.id)); // Fetching post images
      const [likeCount] = await ctx.db.select({ value: count() }).from(likes).where(eq(likes.postId, post.id)).groupBy(likes.postId); // Fetching post like count
      const [userData] = await ctx.db.select().from(users).where(eq(users.id, post.authorId));
  
      if (!userData) {
        throw new TRPCError({ message: "Couldn't fetch user metadata for this post", code: "NOT_FOUND" })
      }
  
      return {
        ...post,
        userData,
        commentCount: commentCount ? commentCount.value : 0,
        imagesArray: images,
        likeCount: likeCount ? likeCount.value : 0,
      }
  
    }))
  
    return postsData;
  }),
});
