<<<<<<< HEAD
import type { posts } from '@/server/db/schema';
import { api } from '@/trpc/server';
import { LucideBadgeCheck, MessageCircle, Trash } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from '../ui/aspect-ratio';
import LikeButton from './LikeButton';
import { Popover, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import DeleteButton from '../DeleteButton';
=======
import type { posts, users } from "@/server/db/schema";
import { api } from "@/trpc/server";
import {
  Heart,
  LucideBadgeCheck,
  MessageCircle,
  MoreHorizontal,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c

type PostCardProps = {
  post: typeof posts.$inferSelect;
};

function PostCard({ post }: PostCardProps) {
  const { id, content } = post;
<<<<<<< HEAD
  const commentCount = await api.comments.commentsCount.query({ postId: id });
  const postImages = await api.posts.postImages.query({ postId: id })
  const user = await api.users.currentUser.query();
  const initialLikeCount = await api.likes.likesCount.query({ postId: id })

  return (
    <div className='mx-auto w-[18rem]  min-h-[10rem] md:w-full max-w-xl md:min-h-[20rem] h-fit drop-shadow-2xl shadow-primary rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 md:backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between px-3'>
          <Link className='flex items-center text-center justify-start space-x-2' href={`/profile?userId=${user.id}`}>
            <div className='relative w-12 h-12  shrink-0'>
              <Image src={user.image ?? "/logo.svg"} alt='' className="rounded-full" fill />
            </div>
            <div className='flex flex-col items-start h-fit -space-y-1'>
              <div className='flex items-center space-x-1'>

                <div className='font-bold md:text-lg text-sm '>
                  {user.name}
                </div>
                <div className='scale-75 md:scale-100'>
                  {user.verified && (
                    <LucideBadgeCheck color='gold' />
                  )}
                </div>
              </div>
              <div className='md:text-sm text-xs text-gray-400 text-center'>
=======
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
        <div className="flex items-center justify-between px-3">
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
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c
                {`@${user.username}`}
              </div>
            </div>
          </Link>
          <Popover>
<<<<<<< HEAD
            <DeleteButton postId={id} />
=======
            <PopoverTrigger>
              <MoreHorizontal />
            </PopoverTrigger>
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c
            <PopoverContent
              className="h-fit w-fit border-0 bg-transparent backdrop-blur-3xl"
              side="right"
            >
              <Button className="h-fit w-fit">
                <Trash width={15} height={15} />
              </Button>
            </PopoverContent>
          </Popover>
<<<<<<< HEAD
        </div>
        <p className='pl-12'>
          {content}
        </p>
        <div>
        </div>
        <Carousel className="object-contain container h-[10rem] w-[15rem] md:h-[15rem] md:w-[25rem]">
          <CarouselContent>
            {postImages.map(img => (
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
      </div>
      <div className='flex justify-around'>
        <LikeButton postId={id} initialLikeCount={initialLikeCount} />
        <div className='flex space-x-2'>
          <MessageCircle />
          <p>{commentCount}</p>
        </div>
=======
        </div>
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
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c
      </div>
    </div>
  );
}

export default PostCard;
