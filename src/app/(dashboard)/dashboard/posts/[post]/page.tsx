import CommentButton from "@/components/CommentButton";
import CommentCard from "@/components/dashboard/CommentCard";
import { api } from "@/trpc/server";
import { LucideBadgeCheck, MessageCircle } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { unstable_noStore as noStore } from "next/cache";
import LikeButton from "@/components/dashboard/LikeButton";

async function Page({ params }: { params: { post: string } }) {
  noStore();
  const post = await api.posts.postById.query({ postId: params.post });
  const comments = await api.comments.getPostComments.query({
    postId: params.post,
  });

  return (
    <div className="container flex w-full flex-col items-center justify-center gap-6 py-12 md:max-w-4xl">
      <div className="flex min-h-[30rem] w-full flex-col justify-evenly gap-2 space-y-6 rounded-lg bg-[#1F2937] bg-opacity-50 p-6  shadow-primary drop-shadow-2xl md:backdrop-blur-3xl">
        <div className="flex items-center justify-start space-x-2 text-center">
          <div className="relative h-12 w-12 shrink-0 rounded-full">
            <Image
              src={post.userData.image ?? "/logo.svg"}
              className="rounded-full"
              alt={""}
              fill
            />
          </div>
          <div className="flex h-fit flex-col items-start -space-y-1">
            <div className="flex items-center space-x-1">
              <div className="text-sm font-bold md:text-lg ">
                {post.userData.name}
              </div>
              <div className="scale-75 md:scale-100">
                {post.userData.verified && <LucideBadgeCheck color="gold" />}
              </div>
            </div>
            <div className="text-center text-xs text-gray-400 md:text-sm">
              {`@${post.userData.username}`}
            </div>
          </div>
        </div>
        <p className="px-2 md:pl-12">{post.content}</p>
        {post.imagesArray && post.imagesArray.length > 0 && (
          <Carousel className="container h-[10rem] w-[15rem] object-contain md:h-[15rem] md:w-[25rem]">
            <CarouselContent>
              {post.imagesArray.map((img) => (
                <CarouselItem key={img.id} className="w-[250px]">
                  <AspectRatio ratio={4 / 3}>
                    <Image src={img.url} alt="" fill />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        )}

        <div className="container flex max-w-xs items-center justify-between">
          {/* <LikeButton postId={post.id} initialLikeCount={post.likeCount ?? 0} /> */}
          <div className="flex space-x-2">
            <MessageCircle />
            <p>{post.commentCount}</p>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container flex items-center justify-between rounded-xl  bg-[#1F2937] bg-opacity-50 p-4 ">
          <p className="font-bold">Comments</p>
          <CommentButton postId={post.id} />
        </div>
        <div className="flex flex-col">
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
