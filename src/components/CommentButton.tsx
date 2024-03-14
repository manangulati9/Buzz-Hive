"use client";

import React from "react";
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

function CommentButton() {
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
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription>
              <Textarea placeholder="Type here to add a comment to this post" />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}

export default CommentButton;
