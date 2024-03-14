import PostCard from "@/components/dashboard/PostCard";
import { MessageCircle, Stars } from "lucide-react";
import React from "react";
import MessageTab from "@/components/dashboard/MessageTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import PostBuzz from "@/components/dashboard/PostBuzz";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import { posts } from "@/server/db/schema";

export default function Page() {
  noStore();
  // const posts = await api.posts.getAllPosts.query({ page: 1 });
  const postArray: (typeof posts.$inferSelect)[] = [
    {
      authorId: "asdasd",
      content: "Hola amigo",
      createdAt: new Date(),
      id: "adgadg",
      updatedAt: new Date(),
    },
    {
      authorId: "sdgsdgn",
      content: "Hola amigo",
      createdAt: new Date(),
      id: "adsgasgd",
      updatedAt: new Date(),
    },
    {
      authorId: "sdgdg",
      content: "Hola amigo",
      createdAt: new Date(),
      id: "adgdg",
      updatedAt: new Date(),
    },
    {
      authorId: "asdg",
      content: "Hola amigo",
      createdAt: new Date(),
      id: "adgsg",
      updatedAt: new Date(),
    },
    {
      authorId: "asdgadsg",
      content: "Hola amigo",
      createdAt: new Date(),
      id: "adsgasg",
      updatedAt: new Date(),
    },
    {
      authorId: "adgg",
      content: "Hola amigo",
      createdAt: new Date(),
      id: "Fdf",
      updatedAt: new Date(),
    },
  ];

  const messages = [
    {
      username: "Olivia dennis",
      userlogo: "/logo.svg",
      text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
      verified: true,
    },
    {
      username: "Max Leiter",
      userlogo: "/logo.svg",
      text: "Hey everyone! 👋 We're excited to announce that we've just closed our Series A funding round. 🚀 Thanks to all our supporters and investors. We're looking forward to the next phase of our journey! #startuplife",
      verified: false,
    },
    {
      username: "Jared Palmer",
      userlogo: "/logo.svg",
      text: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next step to ensure the project's success. Please come prepared with any questions or insights you may have. Looking forward to our meeting! Best, Olivia",
      verified: true,
    },
  ];

  return (
    <div className="container relative mx-auto flex min-h-screen w-full max-w-none justify-around py-10 text-foreground">
      <div className=" w-full  ">
        <div className="mx-auto my-5  flex h-fit  w-[18rem] max-w-xl  justify-between rounded-xl  bg-[#1F2937] bg-opacity-50 px-6 py-2 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] md:w-full md:backdrop-blur-3xl">
          <p className="font-bold">Latest Buzz</p>
          <Stars color="var(--primary)" />
        </div>
        <PostBuzz />
        <div className="flex flex-col space-y-14">
          {/* postArray = posts (mocked) */}
          {postArray.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className="fixed right-8 hidden max-w-sm flex-col items-center  md:flex md:w-full">
        <div className=" mx-auto my-5 flex h-fit    w-[20rem] max-w-2xl  justify-between rounded-xl  bg-[#1F2937] bg-opacity-50 px-6 py-2 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] backdrop-blur-3xl md:w-full">
          <p className="font-bold">Messages</p>
          <MessageCircle color="var(--primary)" />
        </div>
        <ScrollArea className="h-[400px] w-full p-3">
          <div className="my-16 flex  flex-col space-y-10">
            {messages?.map((message) => (
              <MessageTab key={message.username} message={message} />
            ))}
          </div>
        </ScrollArea>
        <Link
          href={"/dashboard/messages"}
          className="rounded-2xl border-2 px-4 py-2 transition-colors duration-500 hover:bg-muted-foreground"
        >
          Show All
        </Link>
      </div>
    </div>
  );
}
