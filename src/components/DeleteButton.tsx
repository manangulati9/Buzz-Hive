'use client'

import { MoreHorizontal } from "lucide-react";
import { PopoverTrigger } from "./ui/popover";
import { api } from "@/trpc/react";

export default function DeleteButton({ postId }: { postId: string }) {
  const { mutate } = api.posts.deletePost.useMutation()

  const handleClick = () => {
    mutate({ postId })
  }

  return <PopoverTrigger onClick={handleClick}>
    <MoreHorizontal />
  </PopoverTrigger>
}
