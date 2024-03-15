import CommentButton from "@/components/CommentButton";
import CommentCard from "@/components/dashboard/CommentCard";
import { api } from "@/trpc/server";
import { Heart, LucideBadgeCheck, MessageCircle } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio";

async function Page({ params }: { params: { post: string } }) {
  const post = await api.posts.postById.query({ postId: params.post })
  const comments = await api.comments.getPostComments.query({ postId: params.post })

  return (
    <div className="">
      <div className="mx-auto my-10  flex h-fit min-h-[10rem] w-[23rem] max-w-5xl flex-col justify-between space-y-4 rounded-lg bg-[#1F2937] bg-opacity-50 px-2 py-2 shadow-primary drop-shadow-2xl md:min-h-[80dvh] md:w-full md:backdrop-blur-3xl">
        <div className="flex flex-col space-y-2">
          <div
            className="flex items-center justify-start space-x-2 text-center"
          >
            <div className="relative h-12 w-12 shrink-0 rounded-full">
              <Image src={post.userData.image ?? "/logo.svg"} className="rounded-full" alt={""} fill />
            </div>
            <div className="flex h-fit flex-col items-start -space-y-1">
              <div className="flex items-center space-x-1">
                <div className="text-sm font-bold md:text-lg ">{post.userData.name}</div>
                <div className="scale-75 md:scale-100">
                  {post.userData.verified && <LucideBadgeCheck color="gold" />}
                </div>
              </div>
              <div className="text-center text-xs text-gray-400 md:text-sm">
                {`@${post.userData.username}`}
              </div>
            </div>
          </div>
          <div className="flex min-h-[70dvh] flex-col justify-between">
            <p className="px-2 md:pl-12">{post.content}</p>
            {post.imagesArray && post.imagesArray.length > 0 &&
              <Carousel className="object-contain container h-[10rem] w-[15rem] md:h-[15rem] md:w-[25rem]">
                <CarouselContent>
                  {post.imagesArray.map(img => (
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
            }
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex space-x-2">
            <Heart />
            <p>{post.likeCount}</p>
          </div>
          <div className="flex space-x-2">
            <MessageCircle />
            <p>{post.commentCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-auto my-5  flex h-fit  w-[23rem] max-w-5xl  justify-between rounded-xl  bg-[#1F2937] bg-opacity-50 px-6 py-2  md:w-full ">
          <p className="font-bold">Comments</p>
          <MessageCircle color="yellow" />
        </div>
        <CommentButton postId={post.id} />
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
