import Image from "next/image";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import PostCards from "@/components/dashboard/PostCards";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default async function Page({
  params,
}: {
  params: { userProfile: string };
}) {
  noStore();
  const userId = params.userProfile;
  const posts = await api.posts.postByUserId.query({ userId });
  const user = await api.users.userById.query({ userId });

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col pt-24 text-white md:max-w-2xl md:pt-0">
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
        <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
          <p className="font-bold text-primary">Buzzes</p>
          <Image src={"/bee.png"} alt={""} width={25} height={25} />
        </BackgroundGradient>
        <div className="flex flex-col space-y-14">
          {posts.map((post) => (
            <PostCards key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
