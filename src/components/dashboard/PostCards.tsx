"use client"

import React from 'react'
import { BackgroundGradient } from '../ui/background-gradient'
import Image from 'next/image'
import { Heart, LucideBadgeCheck, MessageCircle } from 'lucide-react'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { RouterOutputs } from '@/trpc/shared'
import LikeButton from './LikeButton'

type PostCardProps = {
    post: RouterOutputs["posts"]["postByUserId"][number];
  };
  
  function PostCards({ post }: PostCardProps) {
  return (
<div >
      <BackgroundGradient className="rounded-[22px] max-w-xs md:max-w-3xl p-4 md:p-10 bg-black backdrop-blur-3xl dark:bg-zinc-900">
        <div className='flex items-center gap-2'>
            <div className='h-12 w-12 relative rounded-full'>
            <Image src={post.userData.image ?? "/logo.svg"} alt={''} fill className='rounded-full'/>
            </div>
        <div>
          <div className='flex items-center gap-2'>

        <p className="text-base sm:text-xl text-primary  dark:text-neutral-200">
        {post.userData.name}
        </p>
        <div className="scale-75 md:scale-100">
                  {post.userData.verified && <LucideBadgeCheck color="gold" />}
        </div>
          </div>
        <p className="text-base sm:text-xl text-muted-foreground  dark:text-neutral-200">
        {`@${post.userData.username}`}
        </p>
        </div>
        </div>
{post.imagesArray && post.imagesArray.length > 0 && (
            <Carousel className="container h-[15rem] w-[13rem] object-cover md:h-[15rem] md:w-[25rem] flex justify-center items-center">
              <CarouselContent>
                {post.imagesArray.map((img) => (
                  <CarouselItem key={img.id} className="w-[12rem] h-52 relative object-cover">
                    <Image
            src={img.url}
            alt="jordans"
            fill
            className="object-cover my-4"
            /> 
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {post.imagesArray.length>1 && <CarouselNext />}
              {post.imagesArray.length>1 && <CarouselPrevious />}
            </Carousel>
          )}

{/* <Image
            src={`/logo.svg`}
            alt="jordans"
            height="400"
            width="400"
            className="object-contain my-4"
            /> */}
 
        <p className="text-sm text-foreground">
        {post.content}
        </p>
        <div className='flex justify-between px-10'>

        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <Heart/>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            {post.likeCount}
          </span>
        </button>
        <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
          <MessageCircle/>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
          {post.commentCount}
          </span>
        </button>
        </div>
      </BackgroundGradient>
    </div>
  )
}

export default PostCards