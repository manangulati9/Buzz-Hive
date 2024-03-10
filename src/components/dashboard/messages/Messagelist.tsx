import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageCircle } from 'lucide-react'
import React from 'react'
import Messagepromt from './Messagepromt'

function Messagelist() {
    const messages = [
        {
          username : "Olivia dennis",
          userlogo : "/logo.svg",
          text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
          verified : true,
          newmessage : true
        },
        {
          username : "Max Leiter",
          userlogo : "/logo.svg",
          text : "Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife",
          verified : false,
          newmessage : true
        },
        {
          username : "Jared Palmer",
          userlogo : "/logo.svg",
          text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
          verified : true,
          newmessage : true
        },
        {
          username : "Olivia dennis",
          userlogo : "/logo.svg",
          text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
          verified : true,
          newmessage : false
        },
        {
          username : "Max Leiter",
          userlogo : "/logo.svg",
          text : "Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife",
          verified : false,
          newmessage : true
        },
        {
          username : "Jared Palmer",
          userlogo : "/logo.svg",
          text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
          verified : true,
          newmessage : false
        },
        {
          username : "Olivia dennis",
          userlogo : "/logo.svg",
          text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
          verified : true,
          newmessage : true
        },
        {
          username : "Max Leiter",
          userlogo : "/logo.svg",
          text : "Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife",
          verified : false,
          newmessage : true
        },
        {
          username : "Jared Palmer",
          userlogo : "/logo.svg",
          text : "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
          verified : true,
          newmessage : true
        },
      ]
  return (
    <div className='h-full border-2 text-white w-full rounded-2xl overflow-hidden'>
        <div className=' mx-auto w-[20rem] md:w-full max-w-2xl    h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <p className='font-bold'>
          Messages
        </p>
        <MessageCircle color='yellow' />
      </div>
      <ScrollArea className="h-full w-full p-3">
      <div className="flex flex-col  space-y-10 my-16 items-center">
      {messages?.map((message) => (
        <Messagepromt key={message.username} message={message}/>
      ))}
      </div></ScrollArea>
    </div>
  )
}

export default Messagelist
