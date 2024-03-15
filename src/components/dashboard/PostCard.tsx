import { LucideBadgeCheck, MessageCircle } from 'lucide-react'
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
import { RouterOutputs } from '@/trpc/shared';
import DeleteButton from '../DeleteButton';

type PostCardProps = {
  post: RouterOutputs['posts']['postByUserId'][number]
};

function PostCard({ post }: PostCardProps) {
  return (
    <div className='mx-auto w-[18rem] p-4 min-h-[10rem] md:w-full max-w-xl md:min-h-[20rem] h-fit drop-shadow-2xl shadow-primary rounded-lg flex flex-col justify-between space-y-4 md:backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
      <div className='flex flex-col space-y-2'>
        <div className='flex items-center justify-between px-3'>
          <Link className='flex items-center text-center justify-start space-x-2' href={`/profile/${post.userData.id}`}>
            <div className='relative w-12 h-12  shrink-0'>
              <Image src={post.userData.image ?? "/logo.svg"} alt='' className="rounded-full" fill />
            </div>
            <div className='flex flex-col items-start h-fit -space-y-1'>
              <div className='flex items-center space-x-1'>

                <div className='font-bold md:text-lg text-sm '>
                  {post.userData.name}
                </div>
                <div className='scale-75 md:scale-100'>
                  {post.userData.verified && (
                    <LucideBadgeCheck color='gold' />
                  )}
                </div>
              </div>
              <div className='md:text-sm text-xs text-gray-400 text-center'>
                {`@${post.userData.username}`}
              </div>
            </div>
          </Link>
        </div>
        {/* FIX: Delete button position */}
        <DeleteButton postId={post.id} />
        <Link href={`/dashboard/posts/${post.id}`}>
          <p className='max-w-lg'>
            {post.content}
          </p>
          {post.imagesArray && post.imagesArray.length > 0 &&
            <Carousel className="object-contain container h-[10rem] w-[15rem] md:h-[15rem] md:w-[25rem]">
              <CarouselContent>
                {post.imagesArray.map(img => (
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
          }
        </Link>
      </div>
      <div className='flex items-center justify-around'>
        <LikeButton postId={post.id} initialLikeCount={post.likeCount ?? 0} />
        <div className='flex space-x-2'>
          <MessageCircle />
          <p>{post.commentCount}</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
