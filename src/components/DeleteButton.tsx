"use client";

import { api } from "@/trpc/react";
import { revalidateRoute } from "@/lib/actions";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function DeleteButton({ postId }: { postId: string }) {
  const { mutate } = api.posts.deletePost.useMutation({
    onSuccess: async () => {
      await revalidateRoute(["/dashboard", "/dashboard/trending", "/profile"]);
    },
  });

  const handleClick = () => {
    mutate({ postId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="hover:cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent
        className="h-fit w-fit border-0 bg-transparent backdrop-blur-3xl"
        side="right"
      >
        <Button onClick={handleClick} className="h-fit w-fit">
          <Trash width={15} height={15} />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
