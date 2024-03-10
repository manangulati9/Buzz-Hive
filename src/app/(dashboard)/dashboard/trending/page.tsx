import PostCard from '@/components/dashboard/PostCard'
import { Flame, MessageCircle } from 'lucide-react'
import React from 'react'
import MessageTab from '@/components/dashboard/MessageTab';
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import PostBuzz from '@/components/dashboard/PostBuzz'
import { api } from '@/trpc/server';
import { unstable_noStore as noStore } from "next/cache";

async function Page() {
  noStore();
  const posts = await api.posts.getAllPosts.query({ page: 3 })
  const messages = [
    {
      username: "Olivia dennis",
      userlogo: "/logo.svg",
      text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
      verified: true
    },
    {
      username: "Max Leiter",
      userlogo: "/logo.svg",
      text: "Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife",
      verified: false
    },
    {
      username: "Jared Palmer",
      userlogo: "/logo.svg",
      text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
      verified: true
    },
  ]
  return (
    <div className='min-h-screen mx-auto justify-around py-10 text-foreground flex container w-full max-w-none relative'>

      <div className='   '>
        <div className='mx-auto w-[18rem]  md:w-full max-w-xl  h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
          <p className='font-bold'>
            Trending
          </p>
          <Flame color='yellow' />
        </div>
        <PostBuzz />
        <div className="flex flex-col space-y-14">{posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}P</div>
      </div>
      <div className='md:flex flex-col items-center hidden absolute right-8  md:w-full max-w-sm'>
        <div className=' mx-auto w-[20rem] md:w-full max-w-2xl    h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
          <p className='font-bold'>
            Messages
          </p>
          <MessageCircle color='yellow' />
        </div>
        <ScrollArea className="h-[400px] w-full p-3">
          <div className="flex flex-col  space-y-10 my-16">
            {messages?.map((message) => (
              <MessageTab key={message.username} message={message} />
            ))}
          </div></ScrollArea>
        <Link href={'/dashboard/messages'} className='px-4 py-2 border-2 rounded-2xl hover:bg-muted-foreground transition-colors duration-500'>Show All</Link>
      </div>


    </div>
  )
}

export default Page
