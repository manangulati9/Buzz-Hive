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

type PostCardProps = {
  post: typeof posts.$inferSelect
}

async function PostCard({ post }: PostCardProps) {
  const { id, content } = post;
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
                {`@${user.username}`}
              </div>
            </div>
          </Link>
          <Popover>
            <DeleteButton postId={id} />
            <PopoverContent
              className="h-fit w-fit border-0 bg-transparent backdrop-blur-3xl"
              side="right"
            >
              <Button className="h-fit w-fit">
                <Trash width={15} height={15} />
              </Button>
            </PopoverContent>
          </Popover>
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
      </div>
    </div>
  )
}

export default PostCard
