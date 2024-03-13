"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EarthIcon, Smile } from "lucide-react";
import Image from "next/image";
import { type ChangeEvent, useRef, useState } from "react";
import { Textarea } from "../ui/textarea";

function PostBuzz() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (selectedFiles.length + files.length > 5) {
        // Display an error message or take appropriate action
        setError(true);
      } else {
        const newFiles = Array.from(files).slice(0, 5 - selectedFiles.length); // Limit to remaining slots
        setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        setError(false);
      }
    }
  };

  const handleSubmit = () => {
    // Here you can perform actions with the selected files, such as uploading them to a server
    if (selectedFiles.length > 0) {
      console.log("Selected files:", selectedFiles);
      // Perform upload or other operations with the files
    } else {
      console.log("No files selected");
    }
    setShowModal(false);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <Dialog
        open={showModal}
        onOpenChange={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <div className="mx-auto my-10  flex h-fit w-[18rem] max-w-xl  flex-col justify-between space-y-4 rounded-lg bg-[#1F2937] bg-opacity-50 px-2 py-2 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] md:w-full md:backdrop-blur-3xl">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-start space-x-2 text-center">
              <div className="relative h-14 w-14 rounded-full">
                <Image src={"/logo.svg"} alt={""} fill />
              </div>
              <p className="text-base font-bold">What&apos; Buzzin?</p>
            </div>

            <div className="pl-8 md:pl-16">
              <Select>
                <SelectTrigger className="w-fit rounded-xl bg-primary text-xs text-[#322904] transition-colors duration-500 hover:bg-yellow-500 md:text-base">
                  <SelectValue
                    placeholder="Select privacy"
                    className="placeholder:font-bold"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EveryOne">
                    <div className="flex items-center space-x-3  text-[#322904]">
                      <EarthIcon className="text-[#322904]" />
                      <p className="font-bold">Everyone can comment</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="OnlyFollowers">
                    <div className="flex items-center space-x-3  text-[#322904]">
                      <EarthIcon className="text-[#322904]" />
                      <p className="font-bold">Only followers</p>
                    </div>
                  </SelectItem>
                  <SelectItem value="OnlyYouFollow">
                    <div className="flex items-center space-x-3  text-[#322904]">
                      <EarthIcon className="text-[#322904]" />
                      <p className="font-bold">Only people you follow</p>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border-t-2 border-yellow-400 p-2 pl-10 md:pl-16 ">
              <div className="flex justify-evenly space-x-2">
                <DialogTrigger>
                  <Image
                    src={"/mediaicon.svg"}
                    alt={"media"}
                    width={23}
                    height={23}
                    className="cursor-pointer transition-all duration-200 hover:scale-110"
                  />
                </DialogTrigger>
                <DialogTrigger>
                  <Smile
                    className="cursor-pointer text-primary transition-all duration-200 hover:scale-110"
                    height={23}
                    width={23}
                  />
                </DialogTrigger>
              </div>
              <DialogTrigger asChild>
                <div className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full border-2 bg-primary px-4 py-1 text-[#322904] transition-colors duration-500 hover:bg-yellow-500">
                  <p className="Buzz text-sm font-semibold md:text-base">
                    Buzz
                  </p>
                </div>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="max-w-[400px] rounded-lg border-primary bg-[#030712] text-foreground md:max-w-[40rem]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create some Buzz</DialogTitle>
              <DialogDescription>
                Share what you want with users across BuzzHive!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2  space-y-4  rounded-xl py-4">
              <Textarea
                className="min-h-40 border-2 border-muted-foreground md:min-h-80"
                placeholder="What's on your mind today?"
              />

              <div className="flex items-center">
                <Button
                  className="h-fit w-fit justify-around gap-4 border-2 border-muted-foreground bg-transparent text-foreground hover:bg-muted-foreground"
                  onClick={handleInputClick}
                >
                  <Image
                    src={"/mediaicon.svg"}
                    alt={""}
                    width={20}
                    height={20}
                  />
                  Upload
                </Button>
                <input
                  type="file"
                  accept="image/*,video/mp4"
                  multiple
                  onChange={handleFileChange}
                  ref={inputRef}
                  className="hidden"
                />
              </div>
              {error && (
                <p className="text-center text-sm text-destructive">
                  You can only upload up to five files. Try again
                </p>
              )}
              {selectedFiles.length > 0 && (
                <p className="text-center text-sm text-primary">{`${selectedFiles.length} files uploaded`}</p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={error}
                className="font-bold"
              >
                Buzz!
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default PostBuzz;
