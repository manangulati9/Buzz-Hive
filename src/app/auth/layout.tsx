import { ReactNode } from "react";
import Image from 'next/image'

export default function AuthRouteLayout({ children }: { children: ReactNode }) {
  return <>
    <div className="hidden">
      <Image
        src="/honeycomb.svg"
        fill
        alt="Authentication"
        className="block"
      />
    </div>
    <div className="container flex relative flex-col justify-center py-8 md:p-0 items-center h-[100dvh] max-w-none md:grid lg:grid-cols-2">
      <div className="hidden relative flex-col p-10 h-full lg:flex dark:border-r bg-muted">
        <Image src="/bg.png" alt="" fill className="object-cover object-center" />
        <div className="relative z-20 mt-auto">
          <p className="text-lg text-primary-foreground">
            Get buzzing with BuzzHive, where every post is a hive of activity! 🐝
          </p>
        </div>
      </div>
      <div className="md:container relative w-full flex flex-col h-full md:p-8 items-center justify-center">
        <div className="flex gap-4 items-center text-lg absolute top-0 left-0 md:top-8 md:left-8 font-medium w-fit">
          <Image src="/logo.svg" height={50} width={50} alt="" />
          <h2 className="text-2xl font-bold">BuzzHive</h2>
        </div>
        {children}
      </div>
    </div>
  </>
}
