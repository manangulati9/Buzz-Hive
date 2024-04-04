import Image from "next/image";
import { BackgroundGradient } from "../ui/background-gradient";

export default function Component({
  message,
}: {
  message: { username: string; userlogo: string; text: string };
}) {
  const { username, userlogo, text } = message;
  return (
    <BackgroundGradient className="container flex w-full max-w-xs  justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900 ">
      <div className="grid flex-1 gap-4 p-4 text-sm dark:bg-gray-950">
        <div className="flex items-start gap-4">
          <div className="relative h-10 w-10 shrink-0 rounded-full">
            <Image src={userlogo} alt={""} fill className="rounded-full" />
          </div>
          <div className="grid gap-1 text-xs">
            <div className="text-lg font-semibold">{username}</div>
            <div className="text-sm">{text}</div>
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
}
