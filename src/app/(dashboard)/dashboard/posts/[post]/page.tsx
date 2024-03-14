import CommentButton from "@/components/CommentButton";
import CommentCard from "@/components/dashboard/CommentCard";
import type { posts, users } from "@/server/db/schema";
import { Heart, LucideBadgeCheck, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Page() {
  // const { id, content } = post;
  // const likesCount = await api.likes.likesCount.query({ postId: id });
  // const commentCount = await api.comments.commentsCount.query({ postId: id });
  // const user = await api.users.currentUser.query();

  // mocked
  const content = "have fun";

  const likesCount = 123;
  const commentCount = 123;
  const user: typeof users.$inferSelect = {
    createdAt: new Date(),
    email: "saharshisgoodboy@gmail.com",
    id: "asdf",
    image: "/dashboard.png",
    name: "Saharsh",
    passwordHash: "asd",
    updatedAt: new Date(),
    username: "saharshdev",
    verified: true,
  };

  const comments = [
    {
      id: "saharsh",
      name: "saharsh",
      username: "saharsh",
      verified: true,
      comment: "Great job",
    },
    {
      id: "saharsh",
      name: "saharsh",
      username: "saharsh",
      verified: true,
      comment: "Great job",
    },
    {
      id: "saharsh",
      name: "saharsh",
      username: "saharsh",
      verified: true,
      comment: "Great job",
    },
    {
      id: "saharsh",
      name: "saharsh",
      username: "saharsh",
      verified: true,
      comment: "Great job",
    },
  ];

  return (
    <div className="">
      <div className="mx-auto my-10  flex h-fit min-h-[10rem] w-[23rem] max-w-5xl flex-col justify-between space-y-4 rounded-lg bg-[#1F2937] bg-opacity-50 px-2 py-2 shadow-primary drop-shadow-2xl md:min-h-[80dvh] md:w-full md:backdrop-blur-3xl">
        <div className="flex flex-col space-y-2">
          <Link
            className="flex items-center justify-start space-x-2 text-center"
            href={`/profile?userId=${user.id}`}
          >
            <div className="relative h-12 w-12 shrink-0 rounded-full">
              <Image src={"/logo.svg"} alt={""} fill />
            </div>
            <div className="flex h-fit flex-col items-start -space-y-1">
              <div className="flex items-center space-x-1">
                <div className="text-sm font-bold md:text-lg ">{user.name}</div>
                <div className="scale-75 md:scale-100">
                  {user.verified && <LucideBadgeCheck color="gold" />}
                </div>
              </div>
              <div className="text-center text-xs text-gray-400 md:text-sm">
                {`@${user.username}`}
              </div>
            </div>
          </Link>
          <div className="flex min-h-[70dvh] flex-col justify-between">
            <p className="px-2 md:pl-12">{content}</p>

            {user.image && (
              <div className="relative mx-auto h-[10rem] w-[15rem] rounded-2xl border-2 md:h-[30rem] md:w-[57rem]">
                <Image src={user.image} alt={""} fill />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-around">
          <div className="flex space-x-2">
            <Heart />
            <p>{likesCount}</p>
          </div>
          <div className="flex space-x-2">
            <MessageCircle />
            <p>{commentCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="mx-auto my-5  flex h-fit  w-[23rem] max-w-5xl  justify-between rounded-xl  bg-[#1F2937] bg-opacity-50 px-6 py-2  md:w-full ">
          <p className="font-bold">Comments</p>
          <MessageCircle color="yellow" />
        </div>
        <CommentButton />
        <div className="flex flex-col">
          {comments.map((comment) => (
            <CommentCard user={comment} key={comment.username} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
