import Image from "next/image";

export default function Component({
  message,
}: {
  message: { username: string; userlogo: string; text: string };
}) {
  const { username, userlogo, text } = message;
  return (
    <div className="flex h-fit w-[20rem] max-w-sm flex-col rounded-lg border bg-[#1F2937]  bg-opacity-50 backdrop-blur-3xl dark:border-gray-800 md:w-full">
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
    </div>
  );
}
