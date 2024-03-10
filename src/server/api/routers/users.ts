import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { createClient } from "@/server/auth/server";
import { users } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const usersRouter = createTRPCRouter({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error ?? !data.user) {
      throw new TRPCError({ message: "Couldn't retreive current user", code: "NOT_FOUND" });
    }

    const user = data.user;

    const [userData] = await ctx.db.select().from(users).where(eq(users.id, user.id));
    return userData!;
  })

});
