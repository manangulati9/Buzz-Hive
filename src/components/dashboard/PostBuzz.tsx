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
import { useRef, useState } from "react";
import { Textarea } from "../ui/textarea";
<<<<<<< HEAD
import { api } from "@/trpc/react";
import {
  MultiFileDropzone,
  type FileState,
} from '@/components/MultifileDropzone';
import { useEdgeStore } from '@/lib/EdgestoreProvider';
import { cn } from "@/lib/utils";

type FileUpload = {
  url: string;
  filename: string;
} | undefined
=======
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c

function PostBuzz() {
  const [showModal, setShowModal] = useState(false);
<<<<<<< HEAD
  const textRef = useRef<HTMLTextAreaElement | null>(null)
  const { mutate, isLoading } = api.posts.createPost.useMutation({ onSuccess: () => setShowModal(false) })
  const [errorMessage, setErrorMessage] = useState("");
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([])
  const { edgestore } = useEdgeStore();
=======
  const [error, setError] = useState(false);
  const [openEmoji, setopenEmoji] = useState(false);
  const [textValue, settextValue] = useState<
    string | readonly string[] | number | undefined
  >("");
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c

  const updateFileProgress = (key: string, progress: FileState['progress']) => {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const uploadFiles = async () => {
    const uploadedFiles = await Promise.all(
      fileStates.map(async (fileState) => {
        try {
          if (fileState.progress !== 'PENDING') return;
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(fileState.key, progress);
              if (progress === 100) {
                // wait 1 second to set it to complete
                // so that the user can see the progress bar
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(fileState.key, 'COMPLETE');
              }
            },
          });
          return { url: res.url, filename: fileState.file.name }
        } catch (err) {
          updateFileProgress(fileState.key, 'ERROR');
          setErrorMessage(`Error uploading file: ${fileState.file.name}`)
        }
      }),
    );
    setUploadedFiles(uploadedFiles)
  }

  const handleSubmit = async () => {
    const content = textRef.current?.value;

    if (!content || content === "") {
      setErrorMessage("Please enter a valid input");
      return;
    }

    mutate({ content, fileList: uploadedFiles })
  }

  return (
    <div>
      <Dialog
        open={showModal}
        onOpenChange={(newVal) => {
          setShowModal(newVal);
        }}
      >
        <div className="mx-auto my-10  flex h-fit w-[18rem] max-w-xl  flex-col justify-between space-y-4 rounded-lg bg-background bg-opacity-50 px-2 py-2 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] md:w-full md:backdrop-blur-3xl">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-start space-x-2 text-center">
              <div className="relative h-14 w-14 rounded-full">
                <Image src={"/logo.svg"} alt={""} fill />
              </div>
              <p className="text-base font-bold">What&apos; Buzzin?</p>
            </div>

            <div className="pl-8 md:pl-16">
              <Select>
                <SelectTrigger className="w-fit rounded-xl bg-primary text-xs text-[#322904] transition-colors duration-500 hover:bg-primary md:text-base">
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
                    onClick={(prev) => setopenEmoji(!openEmoji)}
                  />
                </DialogTrigger>
              </div>
              <DialogTrigger asChild>
                <div className="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full border-2 bg-primary px-4 py-1 text-[#322904] transition-colors duration-500 hover:bg-primary">
                  <p className="Buzz text-sm font-semibold md:text-base">
                    Buzz
                  </p>
                </div>
              </DialogTrigger>
            </div>
          </div>
          <DialogContent className="max-w-[400px] rounded-lg border-primary bg-background text-foreground md:max-w-[40rem]">
            <DialogHeader>
              <DialogTitle className="text-foreground text-2xl">Create some Buzz</DialogTitle>
              <DialogDescription>
                Share what you want with users across BuzzHive!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 rounded-xl">
              <Textarea
                className="min-h-40 border-2 border-muted-foreground md:min-h-80"
                placeholder="What's on your mind today?"
<<<<<<< HEAD
                ref={textRef}
              />
              <MultiFileDropzone
                value={fileStates}
                className="w-full"
                dropzoneOptions={{
                  maxFiles: 5,
                  maxSize: 1024 * 1024 * 4, // 4 MB
                }}
                onChange={setFileStates}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                }}
              />
            </div>
            {errorMessage !== "" && <p className="text-destructive font-semibold">{errorMessage}</p>}
            <DialogFooter>
              <div className="flex justify-between items-center">
                <Button variant="secondary" className={cn("visible", { "invisible": fileStates.length < 1 })} onClick={uploadFiles} disabled={!fileStates.filter((fileState) => fileState.progress === 'PENDING').length}>
                  Upload
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  className="font-bold"
                >
                  {isLoading ? "Sending your buzz..." : "Buzz!"}
                </Button>
              </div>
=======
                value={textValue}
                onChange={(e) => settextValue(e.target.value)}
              />

              <div className="flex items-center gap-4">
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
                <Smile
                  className="cursor-pointer text-primary transition-all duration-200 hover:scale-110"
                  height={23}
                  width={23}
                  onClick={(prev) => setopenEmoji(!openEmoji)}
                />
              </div>
              <EmojiPicker
                open={openEmoji}
                className="mx-auto text-xs"
                theme={"dark" as Theme}
                height={300}
                onEmojiClick={(e) => {
                  const emoji = `${e.emoji}`;
                  settextValue((prev) => prev?.toString() + emoji);
                }}
              />
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
>>>>>>> 4ad35c2ae0d3395529412b2126ae8f5873009d2c
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default PostBuzz;
