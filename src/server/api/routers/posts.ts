import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { postImages, posts } from "@/server/db/schema";
import { nanoid } from 'nanoid'
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createClient } from "@/server/supabase/server";

export const postsRouter = createTRPCRouter({
  getAllPosts: protectedProcedure.input(z.object({ page: z.number() })).query(async ({ ctx, input }) => {
    const postsArr = await ctx.db.select().from(posts).limit(10).offset(input.page * 10);
    return postsArr;
  }),

  createPost: protectedProcedure.input(z.object({ content: z.string(), imageBlob: z.instanceof(File) })).mutation(async ({ ctx, input }) => {
    const userId = ctx.user.id;
    const fileId = nanoid();
    let path = "";
    const fileExtension = input.imageBlob.name.split('.').pop()?.toLowerCase();

    if (input.imageBlob.type.startsWith("image/")) {
      path = `images/${userId}/${fileId}.${fileExtension}`
    } else if (input.imageBlob.type === 'video/mp4') {
      path = `videos/${userId}/${fileId}.${fileExtension}`
    } else {
      throw new TRPCError({ message: "File type isn't supported", code: "UNPROCESSABLE_CONTENT" })
    }

    const supabase = createClient();
    const { error, data } = await supabase.storage.from("post-files").upload(path, input.imageBlob)

    if (error) {
      throw new TRPCError({ message: "File upload failed", code: "INTERNAL_SERVER_ERROR" })
    }

    if (!data) {
      throw new TRPCError({ message: "Couldn't get file path", code: "NOT_FOUND" })
    }

    const newPosts = await ctx.db.insert(posts).values({ id: nanoid(), content: input.content, authorId: userId }).returning({ id: posts.id });

    if (!newPosts[0]) {
      throw new TRPCError({ message: "Couldn't get post id", code: "NOT_FOUND" });
    }

    await ctx.db.insert(postImages).values({ id: nanoid(), url: data.path, postId: newPosts[0].id })
  }
  ),

  deletePost: protectedProcedure.input(z.object({ postId: z.string() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(posts).where(eq(posts.id, input.postId));
  }),
});
