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
    <div className="flex h-fit w-[80%] flex-col rounded-lg border bg-[#1F2937] bg-opacity-50 transition-colors duration-300   hover:cursor-pointer hover:bg-muted-foreground dark:border-gray-800 md:backdrop-blur-3xl">
      <Drawer>
        <DrawerTrigger>
          <div className="flex items-center justify-between px-2  py-4 text-sm dark:bg-gray-950 md:px-4">
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
                  <div className="text-4xl font-semibold md:text-7xl">
                    {username}
                  </div>
                </div>
              </div>
            </DrawerTitle>

            <DrawerDescription className="max-h-[350px] text-start text-lg text-foreground md:my-auto md:text-xl">
              <ScrollArea className="my-auto h-full w-full px-3">
                {text}
              </ScrollArea>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Replyarea />
            <Button>Send</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
