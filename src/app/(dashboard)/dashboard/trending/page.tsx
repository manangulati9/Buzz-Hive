import PostCard from '@/components/dashboard/PostCard'
import { EarthIcon, Flame, Hand, MessageCircle, Smile, Stars } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MessageTab from '@/components/dashboard/MessageTab'


function page() {
  const posts = [
    {
      username: "Amazon Web Services",
      userlogo: "",
      userid: "aws-amazon",
      verified: true,
      feedtext: "lorem ipsum dolar",
      imageurl: "/logo.png",
      commentscount: 4,
      likescount: 4,
    },
    {
      username: "Manan Gulabi",
      userlogo: "",
      userid: "manan-ki-gulabi",
      verified: false,
      feedtext: `How alternative staffing solutions help organizations improve their #TalentSourcing: 👏Ability to scale business as needed 👏Access to qualified #RemoteWorkers globally 👏Improved productivity with faster hires and streamlined processes.`,
      imageurl: "/logo.svg",
      commentscount: 4,
      likescount: 4,
    },
  ]

  const messages = [
    {
      username : "Olivia dennis",
      userlogo : "/logo.svg",
      text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
      verified : true
    },
    {
      username : "Max Leiter",
      userlogo : "/logo.svg",
      text : "Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife",
      verified : false
    },
    {
      username : "Jared Palmer",
      userlogo : "/logo.svg",
      text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
      verified : true
    },
  ]
  return (
    <div className='min-h-screen mx-auto justify-between py-10 text-white flex '>
      
      <div className='ml-auto mr-auto md:mr-16 w-fit'>
      <div className='mx-auto w-[20rem]  md:w-[30rem]  h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <p className='font-bold'>
          Trending
        </p>
        <Flame color='yellow' />
      </div>
      <div className='mx-auto w-[20rem]  md:w-[30rem] h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-lg flex flex-col justify-between py-2 px-2 space-y-4 my-10 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <div className='flex flex-col space-y-2'>
          <div className='flex items-center text-center justify-start space-x-2'>
            <div className='relative w-14 h-14 rounded-full'>
              <Image src={'/logo.svg'} alt={''} fill />
            </div>
            <p className='font-bold'>
              What&apos; Buzzin?
            </p>
          </div>
          <div className='md:pl-16 pl-8'>
            <Select>
              <SelectTrigger className="w-fit bg-yellow-400 text-[#322904] rounded-xl">
                <SelectValue placeholder="Select privacy" className='placeholder:font-bold' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EveryOne" >
                  <div className='flex space-x-3 text-[#322904]  items-center'>

                    <EarthIcon className='text-[#322904]' />
                    <p className='font-bold'>
                      Everyone can comment

                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="OnlyFollowers">
                  <div className='flex space-x-3 text-[#322904]  items-center'>

                    <EarthIcon className='text-[#322904]' />
                    <p className='font-bold'>
                      Only followers

                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="OnlyYouFollow">
                  <div className='flex space-x-3 text-[#322904]  items-center'>

                    <EarthIcon className='text-[#322904]' />
                    <p className='font-bold'>
                      Only people you follow

                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

          </div>
        
          <div className='flex justify-between md:pl-16 pl-10 items-center border-t-2 p-2 border-yellow-400 '>
            <div className='flex justify-evenly space-x-2'>
              <Hand color='yellow'/>
              <Smile color='yellow'/>
            </div>
              <div className='border-2 flex items-center justify-center w-fit h-fit bg-yellow-400 rounded-full px-4 py-1 cursor-pointer text-[#322904]'>
                <p className='font-semibold'>Buzz</p>
              </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-14">{posts?.map((post) => (
        <PostCard post={post} />
      ))}</div>
      </div>
      <div className='md:flex flex-col hidden'>
      <div className=' mx-auto w-[20rem]  md:w-[30rem]  h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <p className='font-bold'>
          Messages
        </p>
        <MessageCircle color='yellow' />
      </div>
      <div className="flex flex-col h-[380px] overflow-scroll space-y-10 my-16">
      {messages?.map((message) => (
        <MessageTab message={message}  />
      ))}
      </div>
      </div>
      
      
    </div>
  )
}

export default page
