"use client";

import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import Image from "next/image";
import { Heart, LucideBadgeCheck, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { RouterOutputs } from "@/trpc/shared";
import Link from "next/link";

type PostCardProps = {
  post: RouterOutputs["posts"]["postByUserId"][number];
};

function PostCards({ post }: PostCardProps) {
  return (
    <div>
      <BackgroundGradient className="max-w-xs rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900 md:max-w-3xl md:p-10">
        <Link
          className="flex items-center gap-2"
          href={`/profile/${post.userData.id}`}
        >
          <div className="relative h-12 w-12 rounded-full">
            <Image
              src={post.userData.image ?? "/logo.svg"}
              alt={""}
              fill
              className="rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-base text-primary dark:text-neutral-200  sm:text-xl">
                {post.userData.name}
              </p>
              <div className="scale-75 md:scale-100">
                {post.userData.verified && <LucideBadgeCheck color="gold" />}
              </div>
            </div>
            <p className="text-base text-muted-foreground dark:text-neutral-200  sm:text-xl">
              {`@${post.userData.username}`}
            </p>
          </div>
        </Link>
        <Link href={`/dashboard/posts/${post.id}`}>
          {post.imagesArray && post.imagesArray.length > 0 && (
            <Carousel className="container flex h-[15rem] w-[13rem] items-center justify-center object-cover md:h-[15rem] md:w-[25rem]">
              <CarouselContent>
                {post.imagesArray.map((img) => (
                  <CarouselItem
                    key={img.id}
                    className="relative h-52 w-[12rem] object-cover"
                  >
                    <Image
                      src={img.url}
                      alt="jordans"
                      fill
                      className="my-4 object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {post.imagesArray.length > 1 && <CarouselNext />}
              {post.imagesArray.length > 1 && <CarouselPrevious />}
            </Carousel>
          )}

          {/* <Image
            src={`/logo.svg`}
            alt="jordans"
            height="400"
            width="400"
            className="object-contain my-4"
            /> */}

          <p className="text-sm text-foreground">{post.content}</p>
        </Link>
        <div className="flex justify-between px-10">
          <button className="mt-4 flex items-center space-x-1 rounded-full bg-black py-1 pl-4 pr-1 text-xs font-bold text-white dark:bg-zinc-800">
            <Heart />
            <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">
              {post.likeCount}
            </span>
          </button>
          <Link
            className="mt-4 flex items-center space-x-1 rounded-full bg-black py-1 pl-4 pr-1 text-xs font-bold text-white dark:bg-zinc-800"
            href={`/dashboard/posts/${post.id}`}
          >
            <MessageCircle />
            <span className="rounded-full bg-zinc-700 px-2 py-0 text-[0.6rem] text-white">
              {post.commentCount}
            </span>
          </Link>
        </div>
      </BackgroundGradient>
    </div>
  );
}

export default PostCards;
