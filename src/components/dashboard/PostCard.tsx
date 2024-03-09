import { Heart, LucideBadgeCheck, MessageCircle, Share } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PostsProps } from '@/types';


interface PostCardProps{
    post: PostsProps;
}

function PostCard({post} : PostCardProps) {
    const {username, userlogo, userid, verified , feedtext, imageurl, commentscount, likescount} = post;

  return (
    <div className='mx-auto w-[18rem]  min-h-[10rem] md:w-full max-w-xl md:min-h-[20rem] h-fit drop-shadow-2xl shadow-primary rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
      <div className='flex flex-col space-y-2'>
        <Link className='flex items-center text-center justify-start space-x-2' href={userid}>
            <div className='relative w-12 h-12 rounded-full shrink-0'>
                <Image src={'/logo.svg'} alt={''} fill/>
            </div>
            <div className='flex flex-col items-start h-fit -space-y-1'>

            <div className='flex items-center space-x-1'>

            <div className='font-bold md:text-lg text-sm '>
                {username}
            </div>
            <div className='scale-75 md:scale-100'>
            {verified && (
                <LucideBadgeCheck color='gold'/>
            )}
            </div>
            </div>
            <div className='md:text-sm text-xs text-gray-400 text-center'>
                {`@${userid}`}
            </div>
            </div>
        </Link>
        <p className='pl-12'>
            {feedtext}
        </p>
        <div>
            
        </div>
        <div className="h-[10rem] w-[15rem] md:h-[15rem] md:w-[25rem] mx-auto relative border-2 rounded-2xl">
            <Image src={imageurl} alt={''} fill/>
        </div>
      </div>
      <div className='flex justify-around'>
        <div className='flex space-x-2'>
         <Heart/>
         <p>{likescount}</p>   
        </div>
        <div className='flex space-x-2'>
         <MessageCircle/>
         <p>{commentscount}</p>   
        </div>
      </div>
    </div>
  )
}

export default PostCard
