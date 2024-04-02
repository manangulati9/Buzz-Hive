import React from "react";
import PostBuzz from "@/components/dashboard/PostBuzz";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import PostCards from "@/components/dashboard/PostCards";
import LatestBuzz from "@/components/dashboard/LatestBuzz";

// const messages = [
//   {
//     username: "EmilyTraveler",
//     userlogo: "/AvatarMaker.svg",
//     text: "Just landed in Paris! 🇫🇷 Excited to explore the city of love. #travel",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "DavidFitness",
//     userlogo: "/AvatarMaker (1).svg",
//     text: "Completed my first marathon today! 🏃♂️ Feeling accomplished and exhausted. #fitness",
//     verified: true,
//     newmessage: true,
//   },
//   {
//     username: "SophiaFoodie",
//     userlogo: "/AvatarMaker (2).svg",
//     text: "Tried a new sushi restaurant and it was delicious! 🍣 #foodie",
//     verified: false,
//     newmessage: false,
//   },
//   {
//     username: "AlexGamer",
//     userlogo: "/AvatarMaker (3).svg",
//     text: "Just reached level 50 in my favorite game! 🎮 Time for some celebration. #gaming",
//     verified: true,
//     newmessage: true,
//   },
//   {
//     username: "OliviaArtist",
//     userlogo: "/AvatarMaker (4).svg",
//     text: "Started working on a new sculpture today. Can't wait to see how it turns out! #art",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "MichaelTechie",
//     userlogo: "/AvatarMaker (5).svg",
//     text: "Just upgraded my PC with the latest graphics card. It's gaming time! 💻🎮",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "SophieBookworm",
//     userlogo: "/AvatarMaker (6).svg",
//     text: "Started reading 'The Hobbit' again. It's like visiting an old friend. 📚 #booklover",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "JackAdventurer",
//     userlogo: "/AvatarMaker (7).svg",
//     text: "Just went skydiving for the first time! What an exhilarating experience. #adventure",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "AvaPhotographer",
//     userlogo: "/AvatarMaker (8).svg",
//     text: "Captured a stunning sunset today. Nature never fails to inspire me. 🌅 #photography",
//     verified: true,
//     newmessage: true,
//   },
//   {
//     username: "NoahCoder",
//     userlogo: "/AvatarMaker (9).svg",
//     text: "Just completed a challenging coding project. Time to celebrate with some pizza! 🍕 #coding",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "MiaFashionista",
//     userlogo: "/AvatarMaker (11).svg",
//     text: "Wearing my favorite dress today! 💃 Fashion is my passion. #fashion",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "WilliamCyclist",
//     userlogo: "/AvatarMaker (12).svg",
//     text: "Went for a long bike ride in the mountains today. The views were breathtaking! 🚴‍♂️ #cycling",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "CharlotteChef",
//     userlogo: "/AvatarMaker (13).svg",
//     text: "Experimenting with new recipes in the kitchen today. Cooking is my therapy. 🍳 #cheflife",
//     verified: false,
//     newmessage: true,
//   },
//   {
//     username: "JamesMusician",
//     userlogo: "/AvatarMaker (14).svg",
//     text: "Just finished recording a new song! Can't wait to share it with the world. 🎵 #musician",
//     verified: true,
//     newmessage: true,
//   },
//   {
//     username: "EmmaYogi",
//     userlogo: "/AvatarMaker (11).svg",
//     text: "Started practicing yoga again. Finding peace and balance on the mat. 🧘‍♀️ #yoga",
//     verified: false,
//     newmessage: true,
//   },
// ];

export default async function Page() {
  noStore();
  const posts = await api.posts.allPosts.query({ page: 0 });

  return (
    <div className="container mx-auto flex min-h-screen max-w-sm md:max-w-7xl">
      <div className="container relative mx-auto flex min-h-screen w-full max-w-sm flex-col gap-14  text-foreground md:max-w-xl ">
        <LatestBuzz />
        <PostBuzz />
        {posts.length ? (
          <div className="flex flex-col space-y-14">
            {posts.map((post) => (
              <PostCards key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50%] w-full items-center justify-center">
            Maybe try adding some Buzz, as of now there is nothing to show
          </div>
        )}
      </div>
    </div>
  );
}
