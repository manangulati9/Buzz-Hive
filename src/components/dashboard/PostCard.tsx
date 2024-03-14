import type { posts, users } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { Heart, LucideBadgeCheck, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type PostCardProps = {
  post: typeof posts.$inferSelect;
};

function PostCard({ post }: PostCardProps) {
  const { id, content } = post;
  // const likesCount = await api.likes.likesCount.query({ postId: id });
  // const commentCount = await api.comments.commentsCount.query({ postId: id });
  const likesCount = 12;
  const commentCount = 124;
  // const user = await api.users.currentUser.query();

  // mocked
  const user: typeof users.$inferSelect = {
    createdAt: new Date(),
    email: "saharshisgoodboy@gmail.com",
    id: "asdf",
    image: "/dashboard.png",
    name: "Saharsh",
    passwordHash: "asd",
    updatedAt: new Date(),
    username: "saharshdev",
    verified: true,
  };

  return (
    <div className="mx-auto flex  h-fit min-h-[10rem] w-[18rem] max-w-xl flex-col justify-between space-y-4 rounded-lg bg-[#1F2937] bg-opacity-50 px-2 py-2 shadow-primary drop-shadow-2xl md:min-h-[20rem] md:w-full md:backdrop-blur-3xl">
      <div className="flex flex-col space-y-2">
        <Link
          className="flex items-center justify-start space-x-2 text-center"
          href={`/profile?userId=${user.id}`}
        >
          <div className="relative h-12 w-12 shrink-0 rounded-full">
            <Image src={"/logo.svg"} alt={""} fill />
          </div>
          <div className="flex h-fit flex-col items-start -space-y-1">
            <div className="flex items-center space-x-1">
              <div className="text-sm font-bold md:text-lg ">{user.name}</div>
              <div className="scale-75 md:scale-100">
                {user.verified && <LucideBadgeCheck color="gold" />}
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 md:text-sm">
              {`@${user.username}`}
            </div>
          </div>
        </Link>
        <Link href={`/dashboard/posts/${post.id}`}>
          <p className="px-2 md:pl-12">{content}</p>
          <div></div>
          {user.image && (
            <div className="relative mx-auto h-[10rem] w-[15rem] rounded-2xl border-2 md:h-[15rem] md:w-[25rem]">
              <Image src={user.image} alt={""} fill />
            </div>
          )}
        </Link>
      </div>
      <div className="flex justify-around">
        <div className="flex space-x-2">
          <Heart />
          <p>{likesCount}</p>
        </div>
        <Link href={`/dashboard/posts/${post.id}`}>
          <div className="flex space-x-2">
            <MessageCircle />
            <p>{commentCount}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
