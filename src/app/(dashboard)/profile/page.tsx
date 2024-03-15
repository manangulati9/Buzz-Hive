import PostCard from "@/components/dashboard/PostCard";
import Image from "next/image";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import PostCardUser from "@/components/dashboard/PostCardUser";

export default async function Page() {
  noStore();
  const user = await api.users.userById.query();
  const posts = await api.posts.postByUserId.query({ userId: user.id });

  return (
    <div className="mx-auto flex min-h-[100dvh] flex-col text-white md:max-w-[60rem]">
      <main className="container flex-1 space-y-10 p-10">
        <div className="container flex items-center gap-6 p-4">
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-full lg:h-32 lg:w-32">
              <Image
                src={user.image ?? "/logo.svg"}
                className="rounded-full"
                alt={""}
                fill
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-primary sm:text-5xl">
                {user.name}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                @{user.username}
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto flex justify-between border-b-2 border-t-2 border-primary py-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-primary">Contact</h2>
              <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="my-5 flex h-fit w-full max-w-xl justify-between rounded-xl bg-[#1F2937] bg-opacity-50 px-6 py-2 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] md:max-w-none md:backdrop-blur-3xl">
          <p className="font-bold text-primary">Buzzes</p>
          <Image src={"/bee.png"} alt={""} width={25} height={25} />
        </div>
        <div className="flex flex-col space-y-14">
          {posts.map((post) => (
            <PostCardUser key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
