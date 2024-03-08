import PostCard from '@/components/dashboard/PostCard'
import { EarthIcon, Hand, Heart, Link, LucideBadgeCheck, MessageCircle, Share, Smile, Stars, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
      sharecount: 4
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
      sharecount: 4
    },
  ]
  return (
    <div className='min-h-screen md:w-[60%] w-fit space-x-5 justify-between ml-auto md:mr-5 mx-auto py-10 text-white flex'>
      
      <div className=' w-fit'>
      <div className='mx-auto w-[20rem]  md:w-[30rem]  h-fit backdrop-blur drop-shadow-[0_35px_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5'>
        <p className='font-bold'>
          Latest Buzz
        </p>
        <Stars color='yellow' />
      </div>
      <div className='mx-auto w-[20rem]  md:w-[30rem] h-fit backdrop-blur drop-shadow-[0_35px_35px_rgba(1,1,1,1.25)]  rounded-lg flex flex-col justify-between py-2 px-2 space-y-4'>
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
              <SelectTrigger className="w-fit bg-yellow-400 text-black rounded-xl">
                <SelectValue placeholder="Select privacy" className='placeholder:font-bold' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EveryOne" >
                  <div className='flex space-x-3 text-black  items-center'>

                    <EarthIcon color='black' />
                    <p className='font-bold'>
                      Everyone can comment

                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="OnlyFollowers">
                  <div className='flex space-x-3 text-black  items-center'>

                    <EarthIcon color='black' />
                    <p className='font-bold'>
                      Only followers

                    </p>
                  </div>
                </SelectItem>
                <SelectItem value="OnlyYouFollow">
                  <div className='flex space-x-3 text-black  items-center'>

                    <EarthIcon color='black' />
                    <p className='font-bold'>
                      Only people you follow

                    </p>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

          </div>
        
          <div className='flex justify-between md:pl-16 pl-10 items-center border-t-2 p-2 border-yellow-400'>
            <div className='flex justify-evenly space-x-2'>
              <Hand color='yellow'/>
              <Smile color='yellow'/>
            </div>
              <div className='border-2 flex items-center justify-center w-fit h-fit bg-yellow-400 rounded-full px-4 py-1 cursor-pointer text-black'>
                <p className='font-bold'>Buzz</p>
              </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-5">{posts?.map((post) => (
        <PostCard post={post} />
      ))}</div>
      </div>
      
      <div className='hidden  mx-auto w-[20rem]  md:w-[30rem]  h-fit backdrop-blur drop-shadow-[0_35px_35px_rgba(1,1,1,1.25)]  rounded-xl md:flex  justify-between py-2 px-6 my-5'>
        <p className='font-bold'>
          Messages
        </p>
        <MessageCircle color='yellow' />
      </div>
    </div>
  )
}

export default page
