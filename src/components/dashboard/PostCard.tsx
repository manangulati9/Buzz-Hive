import { Heart, LucideBadgeCheck, MessageCircle, Share } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PostsProps } from 'types';


interface PostCardProps{
    post: PostsProps;
}

function PostCard({post} : PostCardProps) {
    const {username, userlogo, userid, verified , feedtext, imageurl, commentscount, likescount} = post;

  return (
    <div className='mx-auto w-[18rem]  min-h-[10rem] md:w-[30rem] md:min-h-[20rem] h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
      <div className='flex flex-col space-y-2'>
        <Link className='flex items-center text-center justify-start space-x-2' href={userid}>
            <div className='relative w-10 h-10 rounded-full'>
                <Image src={'/logo.svg'} alt={''} fill/>
            </div>
            <div className='font-bold md:text-lg text-xs'>
                {username}
            </div>
            <div>
            {verified && (
                <LucideBadgeCheck color='gold'/>
            )}
            </div>
            <div className='md:text-sm text-xs text-gray-400 text-center'>
                {`@${userid}`}
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
