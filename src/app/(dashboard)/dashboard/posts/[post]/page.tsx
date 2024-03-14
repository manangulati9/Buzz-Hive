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
      id: "comment1",
      name: "John Smith",
      verified: true,
      username: "john_smith123",
      comment: "Great post!",
      image: "/AvatarMaker.svg",
    },
    {
      id: "comment2",
      name: "Emma Johnson",
      verified: false,
      username: "emma_23",
      comment: "This is fantastic!",
      image: "/AvatarMaker (2).svg",
    },
    {
      id: "comment3",
      name: "Michael Brown",
      verified: true,
      username: "mike_b",
      comment: "I completely agree with you.",
      image: "/AvatarMaker (3).svg",
    },
    {
      id: "comment4",
      name: "Sophia Rodriguez",
      verified: false,
      username: "sophia_r",
      comment: "Keep up the good work!",
      image: "/AvatarMaker (4).svg",
    },
    {
      id: "comment5",
      name: "David Lee",
      verified: true,
      username: "davidl33",
      comment: "I found this very insightful.",
      image: "/AvatarMaker (5).svg",
    },
    {
      id: "comment6",
      name: "Olivia White",
      verified: false,
      username: "olivia_white",
      comment: "Wow, impressive!",
      image: "/AvatarMaker (6).svg",
    },
    {
      id: "comment7",
      name: "Daniel Taylor",
      verified: false,
      username: "daniel_t",
      comment: "Thanks for sharing!",
      image: "/AvatarMaker (7).svg",
    },
    {
      id: "comment8",
      name: "Emily Harris",
      verified: true,
      username: "emilyharris_",
      comment: "I really enjoyed reading this.",
      image: "/AvatarMaker (8).svg",
    },
    {
      id: "comment9",
      name: "Matthew Martinez",
      verified: true,
      username: "matt_88",
      comment: "This made my day!",
      image: "/AvatarMaker (9).svg",
    },
    {
      id: "comment10",
      name: "Ava Jackson",
      verified: false,
      username: "avaj_123",
      comment: "You're doing great!",
      image: "/AvatarMaker (10).svg",
    },
    {
      id: "comment11",
      name: "William Moore",
      verified: false,
      username: "will_m_22",
      comment: "I admire your work!",
      image: "/AvatarMaker (11).svg",
    },
    {
      id: "comment12",
      name: "Isabella Anderson",
      verified: true,
      username: "izzy_a",
      comment: "Fantastic content!",
      image: "/AvatarMaker (12).svg",
    },
    {
      id: "comment13",
      name: "Noah Wilson",
      verified: true,
      username: "noahw_",
      comment: "Very informative.",
      image: "/AvatarMaker (13).svg",
    },
    {
      id: "comment14",
      name: "Sophie Garcia",
      verified: false,
      username: "sophie_g",
      comment: "I couldn't agree more!",
      image: "/AvatarMaker (14).svg",
    },
    {
      id: "comment15",
      name: "Ethan Lopez",
      verified: true,
      username: "ethan_lo",
      comment: "Looking forward to more!",
      image: "/AvatarMaker (11).svg",
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
