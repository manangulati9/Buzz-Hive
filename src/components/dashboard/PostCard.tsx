import type { posts } from '@/server/db/schema';
import { api } from '@/trpc/server';
import { Heart, LucideBadgeCheck, MessageCircle } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type PostCardProps = {
  post: typeof posts.$inferSelect
}

async function PostCard({ post }: PostCardProps) {
  const { id, content } = post;
  const likesCount = await api.likes.likesCount.query({ postId: id });
  const commentCount = await api.comments.commentsCount.query({ postId: id });
  const user = await api.users.currentUser.query();

  return (
    <div className='mx-auto w-[18rem]  min-h-[10rem] md:w-full max-w-xl md:min-h-[20rem] h-fit drop-shadow-2xl shadow-primary rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
      <div className='flex flex-col space-y-2'>
        <Link className='flex items-center text-center justify-start space-x-2' href={`/profile?userId=${user.id}`}>
          <div className='relative w-12 h-12 rounded-full shrink-0'>
            <Image src={'/logo.svg'} alt={''} fill />
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
        <p className='pl-12'>
          {content}
        </p>
        <div>
        </div>
        {user.image &&
          <div className="h-[10rem] w-[15rem] md:h-[15rem] md:w-[25rem] mx-auto relative border-2 rounded-2xl">
            <Image src={user.image} alt={''} fill />
          </div>
        }
      </div>
      <div className='flex justify-around'>
        <div className='flex space-x-2'>
          <Heart />
          <p>{likesCount}</p>
        </div>
        <div className='flex space-x-2'>
          <MessageCircle />
          <p>{commentCount}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
