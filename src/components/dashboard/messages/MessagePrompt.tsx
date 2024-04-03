import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Replyarea } from "./Replyarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Component({
  message,
}: {
  message: {
    username: string;
    userlogo: string;
    text: string;
    verified: boolean;
    newmessage: boolean;
  };
}) {
  const { username, userlogo, text, newmessage } = message;
  return (
    <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
      <Drawer>
        <DrawerTrigger className="w-full">
          <div className="flex w-full items-center justify-between px-2  py-4 text-sm dark:bg-gray-950 md:px-4">
            <div className="flex items-center gap-4">
              <div className="relative h-10 w-10 shrink-0 rounded-full">
                <Image src={userlogo} alt={""} fill className="rounded-full" />
              </div>
              <div className="grid gap-1 text-xs">
                <div className="text-lg font-semibold">{username}</div>
              </div>
            </div>
            {newmessage && (
              <div className="text-primary">
                <p>New message</p>
              </div>
            )}
          </div>
        </DrawerTrigger>
        <DrawerContent className="container h-[90%] bg-gray-950">
          <DrawerHeader className="">
            <DrawerTitle className="text-primary">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 rounded-full">
                  <Image
                    src={userlogo}
                    alt={""}
                    fill
                    className="rounded-full"
                  />
                </div>
                <div className="grid gap-1 text-xs">
                  <div className="text-4xl font-semibold md:text-5xl">
                    {username}
                  </div>
                </div>
              </div>
            </DrawerTitle>

            <DrawerDescription className="max-h-[350px] text-start text-lg text-foreground md:my-auto md:text-xl">
              <ScrollArea className="my-10 h-full w-full px-3">
                {text}
              </ScrollArea>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex items-center gap-2">
              <Replyarea />
              <Button className="ml-auto w-fit p-4">Send</Button>
            </div>
            <DrawerClose>
              <Button className="ml-0 w-fit" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </BackgroundGradient>
  );
}
