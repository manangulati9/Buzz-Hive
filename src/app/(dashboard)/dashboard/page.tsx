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
      content: "Hola mitro",
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
      username: "EmilyTraveler",
      userlogo: "/AvatarMaker.svg",
      text: "Just landed in Paris! 🇫🇷 Excited to explore the city of love. #travel",
      verified: false,
      newmessage: true,
    },
    {
      username: "DavidFitness",
      userlogo: "/AvatarMaker (1).svg",
      text: "Completed my first marathon today! 🏃‍♂️ Feeling accomplished and exhausted. #fitness",
      verified: true,
      newmessage: true,
    },
    {
      username: "SophiaFoodie",
      userlogo: "/AvatarMaker (2).svg",
      text: "Tried a new sushi restaurant and it was delicious! 🍣 #foodie",
      verified: false,
      newmessage: false,
    },
    {
      username: "AlexGamer",
      userlogo: "/AvatarMaker (3).svg",
      text: "Just reached level 50 in my favorite game! 🎮 Time for some celebration. #gaming",
      verified: true,
      newmessage: true,
    },
    {
      username: "OliviaArtist",
      userlogo: "/AvatarMaker (4).svg",
      text: "Started working on a new sculpture today. Can't wait to see how it turns out! #art",
      verified: false,
      newmessage: true,
    },
    {
      username: "MichaelTechie",
      userlogo: "/AvatarMaker (5).svg",
      text: "Just upgraded my PC with the latest graphics card. It's gaming time! 💻🎮",
      verified: false,
      newmessage: true,
    },
    {
      username: "SophieBookworm",
      userlogo: "/AvatarMaker (6).svg",
      text: "Started reading 'The Hobbit' again. It's like visiting an old friend. 📚 #booklover",
      verified: false,
      newmessage: true,
    },
    {
      username: "JackAdventurer",
      userlogo: "/AvatarMaker (7).svg",
      text: "Just went skydiving for the first time! What an exhilarating experience. #adventure",
      verified: false,
      newmessage: true,
    },
    {
      username: "AvaPhotographer",
      userlogo: "/AvatarMaker (8).svg",
      text: "Captured a stunning sunset today. Nature never fails to inspire me. 🌅 #photography",
      verified: true,
      newmessage: true,
    },
    {
      username: "NoahCoder",
      userlogo: "/AvatarMaker (9).svg",
      text: "Just completed a challenging coding project. Time to celebrate with some pizza! 🍕 #coding",
      verified: false,
      newmessage: true,
    },
    {
      username: "MiaFashionista",
      userlogo: "/AvatarMaker (11).svg",
      text: "Wearing my favorite dress today! 💃 Fashion is my passion. #fashion",
      verified: false,
      newmessage: true,
    },
    {
      username: "WilliamCyclist",
      userlogo: "/AvatarMaker (12).svg",
      text: "Went for a long bike ride in the mountains today. The views were breathtaking! 🚴‍♂️ #cycling",
      verified: false,
      newmessage: true,
    },
    {
      username: "CharlotteChef",
      userlogo: "/AvatarMaker (13).svg",
      text: "Experimenting with new recipes in the kitchen today. Cooking is my therapy. 🍳 #cheflife",
      verified: false,
      newmessage: true,
    },
    {
      username: "JamesMusician",
      userlogo: "/AvatarMaker (14).svg",
      text: "Just finished recording a new song! Can't wait to share it with the world. 🎵 #musician",
      verified: true,
      newmessage: true,
    },
    {
      username: "EmmaYogi",
      userlogo: "/AvatarMaker (11).svg",
      text: "Started practicing yoga again. Finding peace and balance on the mat. 🧘‍♀️ #yoga",
      verified: false,
      newmessage: true,
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
