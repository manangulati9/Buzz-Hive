"use client";

import EmojiPicker, { type Theme } from "emoji-picker-react";
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
import { Smile } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { api } from "@/trpc/react";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/MultifileDropzone";
import { useEdgeStore } from "@/lib/EdgestoreProvider";
import { cn } from "@/lib/utils";
import { revalidateRoute } from "@/lib/actions";
import { unstable_noStore as noStore } from "next/cache";
import { BackgroundGradient } from "../ui/background-gradient";

type FileUpload =
  | {
      url: string;
      filename: string;
    }
  | undefined;

function PostBuzz() {
  noStore();
  const [showModal, setShowModal] = useState(false);
  const [textValue, setTextValue] = useState("");
  const { mutate, isLoading } = api.posts.createPost.useMutation({
    onSuccess: async () => {
      await revalidateRoute("/dashboard");
      setShowModal(false);
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const { edgestore } = useEdgeStore();
  const [openEmoji, setopenEmoji] = useState(false);

  const updateFileProgress = (key: string, progress: FileState["progress"]) => {
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
  };

  const uploadFiles = async () => {
    const uploadedFiles = await Promise.all(
      fileStates.map(async (fileState) => {
        try {
          if (fileState.progress !== "PENDING") return;
          const res = await edgestore.publicFiles.upload({
            file: fileState.file,
            onProgressChange: async (progress) => {
              updateFileProgress(fileState.key, progress);
              if (progress === 100) {
                // wait 1 second to set it to complete
                // so that the user can see the progress bar
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(fileState.key, "COMPLETE");
              }
            },
          });
          return { url: res.url, filename: fileState.file.name };
        } catch (err) {
          updateFileProgress(fileState.key, "ERROR");
          setErrorMessage(`Error uploading file: ${fileState.file.name}`);
        }
      }),
    );
    setUploadedFiles(uploadedFiles);
  };

  const handleSubmit = () => {
    const content = textValue;

    if (!content || content === "") {
      setErrorMessage("Please enter a valid input");
      return;
    }

    mutate({ content, fileList: uploadedFiles });
  };

  return (
    <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
      <Dialog
        open={showModal}
        onOpenChange={(newVal) => {
          setShowModal(newVal);
          setFileStates([]);
        }}
      >
        <div className="w-full">
          <div className="flex w-full flex-col space-y-2">
            <div className="flex items-center justify-start space-x-2 text-center">
              <div className="relative h-14 w-14 rounded-full">
                <Image src={"/logo.svg"} alt={""} fill />
              </div>
              <p className="text-base font-bold">What&apos; Buzzin?</p>
            </div>

            <div className=" flex h-fit items-center justify-center text-center  text-xl  text-muted-foreground md:text-3xl">
              Create a new Buzz!
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
                    onClick={() => setopenEmoji(!openEmoji)}
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
              <DialogTitle className="text-2xl text-foreground">
                Create some Buzz
              </DialogTitle>
              <DialogDescription>
                Share what you want with users across BuzzHive!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 rounded-xl">
              <Textarea
                className="min-h-40 border-2 border-muted-foreground md:min-h-80"
                placeholder="What's on your mind today?"
                onChange={(e) => setTextValue(e.target.value)}
                value={textValue}
              />
              <MultiFileDropzone
                value={fileStates}
                className="w-full"
                dropzoneOptions={{
                  maxFiles: 5,
                  maxSize: 1024 * 1024 * 4, // 4 MB
                }}
                onChange={setFileStates}
                onFilesAdded={(addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                }}
              />
            </div>
            {errorMessage !== "" && (
              <p className="font-semibold text-destructive">{errorMessage}</p>
            )}
            <DialogFooter>
              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  className={cn("visible", {
                    invisible: fileStates.length < 1,
                  })}
                  onClick={uploadFiles}
                  disabled={
                    !fileStates.filter(
                      (fileState) => fileState.progress === "PENDING",
                    ).length
                  }
                >
                  Upload
                </Button>
                <div className="relative flex items-center gap-4">
                  <Smile
                    className="cursor-pointer text-primary transition-all duration-200 hover:scale-110"
                    height={23}
                    width={23}
                    onClick={() => setopenEmoji(!openEmoji)}
                  />
                  <EmojiPicker
                    open={openEmoji}
                    theme={"dark" as Theme}
                    className="!absolute bottom-12 right-0"
                    height={300}
                    onEmojiClick={(e) => {
                      setTextValue((prev) => `${prev}${e.emoji}`);
                    }}
                  />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="font-bold"
                  >
                    {isLoading ? "Sending your buzz..." : "Buzz!"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </BackgroundGradient>
  );
}

export default PostBuzz;
