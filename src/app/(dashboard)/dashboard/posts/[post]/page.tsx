import CommentButton from "@/components/CommentButton";
import CommentCard from "@/components/dashboard/CommentCard";
import { api } from "@/trpc/server";
import { unstable_noStore as noStore } from "next/cache";
import PostCards from "@/components/dashboard/PostCards";
import { BackgroundGradient } from "@/components/ui/background-gradient";

async function Page({ params }: { params: { post: string } }) {
  noStore();
  const post = await api.posts.postById.query({ postId: params.post });
  const comments = await api.comments.getPostComments.query({
    postId: params.post,
  });

  return (
    <div className="container flex w-full max-w-md flex-col items-center justify-center gap-6 py-12 pt-24 md:max-w-2xl md:pt-0">
      <div className="w-full">
        <PostCards post={post} />
      </div>
      <div className="w-full">
        <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
          <p className="font-bold">Comments</p>
          <CommentButton postId={post.id} />
        </BackgroundGradient>
        <div className="mt-10 flex flex-col gap-5">
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
