import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle } from 'lucide-react'
import React from 'react'
import Notificationpromt from './Notificationpromt'

function Messagelist() {
    const messages = [
        {
        key: 1,
        logo : "/logo.svg",
        content : "Your post has 90 likes.",
        newmessage : true
        },
        {
        key: 2,
        logo : "/logo.svg",
        content : "Your post has 80 likes.",
        newmessage : true
        },
        {
        key: 3,
        logo : "/logo.svg",
        content : "Your post has 70 likes.",
        newmessage : true
        },
        {
        key: 4,
        logo : "/logo.svg",
        content : "Your post has 60 likes.",
        newmessage : true
        },
        {
        key: 5,
        logo : "/logo.svg",
        content : "Your post has 50 likes.",
        newmessage : true
        },
        {
        key: 6,
        logo : "/logo.svg",
        content : "Your post has 40 likes.",
        newmessage : true
        },
        {
        key: 7,
        logo : "/logo.svg",
        content : "Your post has 20 likes.",
        newmessage : true
        },
        {
        key: 8,
        logo : "/logo.svg",
        content : "Your post has 10 likes.",
        newmessage : true
        },
        {
        key: 9,
        logo : "/logo.svg",
        content : "Your post has 05 likes.",
        newmessage : true
        },

      ]
  return (
    <div className='h-full border-2 text-foreground w-full rounded-2xl overflow-hidden'>
        <div className=' mx-auto w-[20rem] md:w-full max-w-2xl    h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <p className='font-bold'>
          Messages
        </p>
        <MessageCircle color='yellow' />
      </div>
      <ScrollArea className="h-full w-full p-3">
      <div className="flex flex-col  space-y-10 my-16 items-center">
      {messages?.map((message) => (
        <Notificationpromt key={message.key} message={message}/>
      ))}
      </div></ScrollArea>
    </div>
  )
}

export default Messagelist
