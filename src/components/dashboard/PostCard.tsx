import { LucideBadgeCheck, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import LikeButton from "./LikeButton";
import { RouterOutputs } from "@/trpc/shared";
import DeleteButton from "../DeleteButton";

type PostCardProps = {
  post: RouterOutputs["posts"]["postByUserId"][number];
};

function PostCard({ post }: PostCardProps) {
  return (
    <div className="mx-auto flex h-fit min-h-[10rem] w-[18rem] max-w-xl flex-col justify-between space-y-4 rounded-lg bg-[#1F2937] bg-opacity-50 p-4 shadow-primary drop-shadow-2xl md:min-h-[20rem] md:w-full md:backdrop-blur-3xl">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between px-3">
          <Link
            className="flex items-center justify-start space-x-2 text-center"
            href={`/profile/${post.userData.id}`}
          >
            <div className="relative h-12 w-12  shrink-0">
              <Image
                src={post.userData.image ?? "/logo.svg"}
                alt=""
                className="rounded-full"
                fill
              />
            </div>
            <div className="flex h-fit flex-col items-start -space-y-1">
              <div className="flex items-center space-x-1">
                <div className="text-sm font-bold md:text-lg ">
                  {post.userData.name}
                </div>
                <div className="scale-75 md:scale-100">
                  {post.userData.verified && <LucideBadgeCheck color="gold" />}
                </div>
              </div>
              <div className="text-center text-xs text-gray-400 md:text-sm">
                {`@${post.userData.username}`}
              </div>
            </div>
          </Link>
          <DeleteButton postId={post.id} />
        </div>
        <Link
          href={`/dashboard/posts/${post.id}`}
          className="container space-y-6"
        >
          <p className="max-w-3xl p-2">{post.content}</p>
          {post.imagesArray && post.imagesArray.length > 0 && (
            <Carousel className="container h-[15rem] w-[15rem] object-contain md:h-[15rem] md:w-[25rem]">
              <CarouselContent>
                {post.imagesArray.map((img) => (
                  <CarouselItem key={img.id} className="w-[250px]">
                    <AspectRatio ratio={4 / 3}>
                      <Image src={img.url} alt="" fill />
                    </AspectRatio>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          )}
        </Link>
      </div>
      <div className="flex items-center justify-around pt-2">
        <LikeButton postId={post.id} initialLikeCount={post.likeCount ?? 0} />
        <Link className="flex space-x-2" href={`/dashboard/posts/${post.id}`}>
          <MessageCircle />
          <p>{post.commentCount}</p>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
