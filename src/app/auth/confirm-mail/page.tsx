import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function Page() {
  return <div className="container p-4 gap-10 flex flex-col justify-center items-center">
    <div className="w-[300px] md:w-[450px]">
      <AspectRatio ratio={4 / 3}>
        <Image src="/bee.png" alt="" fill />
      </AspectRatio>
    </div>
    <div className="space-y-2 text-center">
      <h1 className="text-3xl font-bold">We&apos;ve sent you a confirmation mail</h1>
      <h2 className="text-lg text-muted-foreground">Please check your mail to complete your sign up</h2>
    </div>
  </div>
}
