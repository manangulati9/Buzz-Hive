import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell } from "lucide-react";
import Notificationpromt from "./Notificationpromt";

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
      <div className=" mx-auto my-5 flex h-fit    w-[20rem] max-w-2xl  justify-between rounded-xl  bg-[#1F2937] bg-opacity-50 px-6 py-2 drop-shadow-[0_0_35px_rgba(1,1,1,1.25)] md:w-full md:backdrop-blur-3xl">
        <p className="font-bold">Notifications</p>
        <Bell color="yellow" />
      </div>
      <ScrollArea className="h-full w-full p-3">
        <div className="my-16 flex  flex-col items-center space-y-10">
          {messages?.map((message) => (
            <Notificationpromt key={message.key} message={message} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default Messagelist;
