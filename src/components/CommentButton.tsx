"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { api } from "@/trpc/react";
import { revalidateRoute } from "@/lib/actions";

function CommentButton({ postId }: { postId: string }) {
  const [textValue, setTextValue] = useState("");
  const { mutate, isLoading } = api.comments.createComment.useMutation({
    onSuccess: async () => {
      await revalidateRoute(`/dashboard/posts/${postId}`)
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value)
  }

  const handleSubmit = () => {
    mutate({ content: textValue, postId })
  }

  return (
    <Dialog>
      <div className="mx-auto flex w-[23rem] max-w-5xl justify-end md:w-full">
        <DialogTrigger
          className={buttonVariants({
            variant: "default",
            className: "bg-primary",
          })}
        >
          Comment
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold tracking-tighter">Add new comment</DialogTitle>
            <DialogDescription>
              Share your views with your content
            </DialogDescription>
          </DialogHeader>
          <Textarea value={textValue} placeholder="Type here" className="min-h-[10rem]" onChange={handleChange} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={isLoading} onClick={handleSubmit} className="w-fit ml-auto mr-0">{
                isLoading ? "Posting..." : "Post"
              }</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default CommentButton;
