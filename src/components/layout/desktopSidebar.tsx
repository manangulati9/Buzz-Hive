"use client";

import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  TrendingUp,
  User2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { BackgroundBeams } from "../ui/background-beams";

const PcSidebar = () => {
  const pathname = usePathname();
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };
  return (
    <div className="sidebar container fixed left-[50%] top-0 mx-auto hidden h-screen w-full max-w-7xl md:block">
      <div className="z-50 w-full max-w-sm md:max-w-xs">
        <BackgroundGradient className="z-50 flex h-screen w-full max-w-xs flex-col justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
          <div className="z-20">
            <div className="flex h-fit items-center gap-2 text-3xl text-primary">
              <div className="relative h-20 w-20">
                <Image src={"/logo.svg"} alt={""} fill />
              </div>
              <div>BuzzHive</div>
            </div>
            <div className="">
              <div className="flex h-full flex-col justify-between">
                <div
                  id="Navbar items"
                  className={cn("flex flex-col space-y-3  pt-10", {})}
                >
                  <Link
                    id="Items"
                    className={cn(
                      "transition-color flex h-12 items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                      {
                        ["border-2 bg-primary text-primary-foreground"]:
                          pathname === "/dashboard",
                      },
                    )}
                    href={"/dashboard/"}
                  >
                    <Home />
                    {true && <p className={cn("text-lg")}>Home</p>}
                  </Link>
                  <Link
                    id="Items"
                    className={cn(
                      "transition-color flex h-12 items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                      {
                        ["border-2 bg-primary text-primary-foreground"]:
                          pathname === "/dashboard/messages",
                      },
                    )}
                    href={"/dashboard/messages"}
                  >
                    <MessageCircle />
                    {true && <p className={cn("text-lg")}>Messages</p>}
                  </Link>
                  <div className="flex items-center -space-x-1">
                    <Link
                      id="Items"
                      className={cn(
                        "transition-color flex h-12 w-full items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                        {
                          ["border-2 bg-primary text-primary-foreground"]:
                            pathname === "/dashboard/notifications",
                        },
                      )}
                      href={"/dashboard/notifications"}
                    >
                      <Bell />
                      {true && <p className={cn("text-lg")}>Notifications</p>}
                    </Link>
                  </div>
                  <Link
                    id="Items"
                    className={cn(
                      "transition-color flex h-12 items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                      {
                        ["border-2 bg-primary text-primary-foreground"]:
                          pathname === "/profile",
                      },
                    )}
                    href={"/profile"}
                  >
                    <User2 />
                    {true && <p className={cn("text-lg")}>User</p>}
                  </Link>
                  <Link
                    id="Items"
                    className={cn(
                      "transition-color flex h-12 items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                      {
                        ["border-2 bg-primary text-primary-foreground"]:
                          pathname === "/dashboard/trending",
                      },
                    )}
                    href={"/dashboard/trending"}
                  >
                    <TrendingUp />
                    {true && <p className={cn("text-lg")}>Trending</p>}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Button
            className="z-20 mx-auto flex items-center gap-2 rounded-full transition-all hover:scale-110 hover:bg-primary/80"
            size="lg"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
          <BackgroundBeams className=" z-10  h-full " />
        </BackgroundGradient>
      </div>
    </div>
  );
};

export default PcSidebar;
