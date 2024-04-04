import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import Notificationpromt from "./Notificationpromt";
import { BackgroundGradient } from "@/components/ui/background-gradient";

const messages = [
  {
    key: 1,
    logo: "/logo.svg",
    content: "Your post has 90 likes.",
    newmessage: true,
  },
  {
    key: 2,
    logo: "/logo.svg",
    content: "Your post has 80 likes.",
    newmessage: true,
  },
  {
    key: 3,
    logo: "/logo.svg",
    content: "Your post has 70 likes.",
    newmessage: true,
  },
  {
    key: 4,
    logo: "/logo.svg",
    content: "Your post has 60 likes.",
    newmessage: true,
  },
  {
    key: 5,
    logo: "/logo.svg",
    content: "Your post has 50 likes.",
    newmessage: true,
  },
  {
    key: 6,
    logo: "/logo.svg",
    content: "Your post has 40 likes.",
    newmessage: true,
  },
  {
    key: 7,
    logo: "/logo.svg",
    content: "Your post has 20 likes.",
    newmessage: true,
  },
  {
    key: 8,
    logo: "/logo.svg",
    content: "Your post has 10 likes.",
    newmessage: true,
  },
  {
    key: 9,
    logo: "/logo.svg",
    content: "Your post has 05 likes.",
    newmessage: true,
  },
];
function Messagelist() {
  return (
    <div className="h-full  w-full overflow-hidden rounded-2xl text-foreground">
      <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
        <p className="font-bold">Notifications</p>
        <Bell color="yellow" />
      </BackgroundGradient>
      <ScrollArea className="h-full w-full p-3">
        <div className="my-16 flex  flex-col  space-y-10">
          {messages?.map((message) => (
            <Notificationpromt key={message.key} message={message} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Messagelist;
