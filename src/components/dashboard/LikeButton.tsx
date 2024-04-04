"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// export default function LikeButton({ postId, initialLikeCount }: { postId: string, initialLikeCount: number | null }) {
export default function LikeButton() {
  // const { mutate: likePost, data } = api.likes.likePost.useMutation({o});
  // const { data: isLiked, refetch: refetchLikeStatus } = api.likes.isLiked.useQuery({ postId });
  // const { mutate: unlikePost } = api.likes.unlikePost.useMutation();
  // const { data: likesCount, refetch: refetchLikesCount } = api.likes.likesCount.useQuery({ postId }, { initialData: initialLikeCount })
  //
  // const handleLike = () => {
  //   // refetchLikeStatus()
  //   refetchLikesCount()
  //
  //   if (isLiked && data) {
  //     unlikePost({ postId, likeId: data.likeId })
  //   } else {
  //     likePost({ postId })
  //   }
  // }
  //
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLikeUpdate = () => {
    setLikeStatus((prev) => !prev);
  };

  useEffect(() => {
    setLikeCount(getRandomNumber(1, 100));
  }, []);

  useEffect(() => {
    if (likeStatus) {
      setLikeCount((prevLikes) => prevLikes + 1);
    } else {
      setLikeCount((prevLikes) => prevLikes - 1);
    }
  }, [likeStatus]);

  return (
    <Button
      onClick={handleLikeUpdate}
      className="group flex items-center justify-center gap-2 rounded-full p-2 no-underline"
      variant="link"
    >
      <Heart
        className={cn("h-6 w-6 stroke-white transition-all", {
          "fill-red-600": likeStatus,
        })}
      />
      {likeCount > 0 && <span className="text-lg font-bold">{likeCount}</span>}
    </Button>
  );
}

function getRandomNumber(min: number, max: number): number {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const random = Math.random();

  // Scale the random number to fit within the range [min, max)
  const scaledRandom = random * (max - min);

  // Shift the scaled random number to start from min
  const randomNumberInRange = scaledRandom + min;

  // Return the random number within the specified range
  return Math.floor(randomNumberInRange);
}
