import { z } from "zod";
import {
  createTRPCRouter,
  getServerSession,
  protectedProcedure,
} from "@/server/api/trpc";
import { posts } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  getAllPosts: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    try {
      const postsArr = await ctx.db.select().from(posts).limit(10).offset(input * 10);

      return postsArr;
    } catch (error) {
      console.error(error)
      return null;
    }
  }),

  createPost: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    try {
      const session = await getServerSession();

      if (!session) {
        return null;
      }

      const userId = session.user.id;
      await ctx.db.insert(posts).values({ content: input, authorId: userId })

      return true;
    } catch (error) {
      console.error(error)
      return null;
    }
  }),

});
