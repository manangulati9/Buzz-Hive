import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthRouteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="hidden">
        <Image
          src="/honeycomb.svg"
          fill
          alt="Authentication"
          className="block"
        />
      </div>
      <div className="container relative flex h-[100dvh] max-w-none flex-col items-center justify-center py-8 md:grid md:p-0 lg:grid-cols-2">
        <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
          <Image
            src="/bg.png"
            alt=""
            fill
            className="object-cover object-center"
          />
          <div className="relative z-20 mt-auto">
            <p className="text-center text-3xl font-bold tracking-tighter text-black">
              Get buzzing with BuzzHive, where every post is a hive of activity!
              🐝
            </p>
          </div>
        </div>
        <div className="relative flex h-full w-full flex-col items-center justify-center md:container md:p-8">
          <div className="absolute left-0 top-0 flex w-fit items-center gap-4 text-lg font-medium md:left-8 md:top-8">
            <Image src="/logo.svg" height={50} width={50} alt="" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              BuzzHive
            </h2>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
