import { LucideBadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CommentCard({
  user,
}: {
  user: {
    id: string;
    name: string;
    verified: boolean;
    username: string;
    comment: string;
  };
}) {
  return (
    <div className="mx-auto my-5  flex  h-fit w-[23rem] max-w-5xl  flex-col justify-between  gap-5 rounded-xl  bg-[#1F2937] bg-opacity-50  px-6 py-4 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] md:w-full md:backdrop-blur-3xl">
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
      </div>
      <div className="flex gap-2">
        <p className="text-primary">Commented:</p>
        <p>{user.comment}</p>
      </div>
    </div>
  );
}

export default CommentCard;
