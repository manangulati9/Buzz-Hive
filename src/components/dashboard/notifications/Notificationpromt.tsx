import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";

export default function Component({
  message,
}: {
  message: { logo: string; content: string; newmessage: boolean };
}) {
  const { logo, content, newmessage } = message;
  return (
    <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
      <div className="flex items-center  justify-between p-4 text-sm dark:bg-gray-950">
        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10 shrink-0 rounded-full">
            <Image src={logo} alt={""} fill />
          </div>
          <div className="grid gap-1 text-xs">
            <div className="text-xs font-semibold md:text-lg">{content}</div>
          </div>
        </div>
        {newmessage && (
          <div className="text-primary">
            <p className="text-xs md:text-base">New</p>
          </div>
        )}
      </div>
    </BackgroundGradient>
  );
}
