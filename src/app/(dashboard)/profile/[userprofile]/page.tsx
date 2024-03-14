import PostCard from "@/components/dashboard/PostCard";
import Image from "next/image";
import { api } from '@/trpc/server';
import { unstable_noStore as noStore } from "next/cache";

export default async function Component({params} : {params : {userprofile : string}}) {
  noStore();
    const posts = await api.posts.getAllPosts.query({ page: 1 })
  return (
    <div className="flex flex-col min-h-[100dvh] text-white">
      <main className="flex-1 p-10 space-y-10 container">
        <div className=" container grid  gap-6 px-4 text-center items-center lg:grid-cols-[200px_1fr] lg:gap-10 lg:px-6 xl:grid-cols-[250px_1fr] py-10">
          <div className="mx-auto flex items-center justify-center lg:justify-start">
            <div className="rounded-full overflow-hidden w-24 h-24 lg:w-32 lg:h-32 relative">
              <Image src={"/logo.svg"} alt={""} fill/>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-primary-foregroundxl font-bold tracking-tighter sm:text-5xl text-primary">{params.userprofile}</h1>
              <p className="text-gray-500 dark:text-gray-400">@AliceJ</p>
            </div>
          </div>
        </div>
        <div className="mx-auto container flex justify-between border-b-2 border-t-2 py-10 border-primary">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Contact</h2>
              <p className="text-gray-500 dark:text-gray-400">
                alicejohnson69@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className='w-[20rem]     h-fit drop-shadow-[0_0_35px_rgba(1,1,1,1.25)]  rounded-xl flex  justify-between py-2 px-6 my-5 md:backdrop-blur-3xl bg-[#1F2937] bg-opacity-50'>
        <p className='font-bold text-primary'>
          Buzzes
        </p>
        <Image src={"/bee.png"} alt={""} width={25} height={25}/>
      </div>
      <div className="flex flex-col space-y-14">{posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}</div>
      </main>
    </div>
  )
}

