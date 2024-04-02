"use client";

import {
  Bell,
  ChevronLeftCircle,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  TrendingUp,
  User2,
} from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const [isClicked, setisClicked] = useState(false);
  const [isHovering, setisHovering] = useState(true);
  const pathname = usePathname();

  const ref = useRef(null);

  const handleClickOutside = () => {
    setisClicked(true);
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="fixed z-50 h-fit  w-full md:hidden md:p-0">
      <div className="flex w-full items-center justify-between bg-black px-5 pb-2 pt-7">
        <div
          onClick={() => setisClicked(!isClicked)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <Menu className="" />
        </div>
        <Link className=" relative z-50 h-10 w-10 md:hidden" href={"/"}>
          <Image src={"/logo.svg"} alt={""} fill />
        </Link>
        <div className=" relative z-50 h-10 w-10 opacity-0 md:hidden">
          <Image src={"/"} alt={""} fill className="rounded-full" />
        </div>
      </div>
      <div
        ref={ref}
        className={cn(
          "fixed left-0  top-0 z-50 h-full  w-60 border-opacity-50 shadow-md shadow-primary drop-shadow-[0_35px_35px_rgba(1,1,1,1.25)] backdrop-blur-3xl transition-all duration-300",
          {
            ["-translate-x-full opacity-0 md:translate-x-0 md:scale-100 md:opacity-100"]:
              isClicked,
            ["translate-x-0 opacity-100  "]: !isClicked,
          },
        )}
        onMouseEnter={() => setisHovering(false)}
        onMouseLeave={() => setisHovering(true)}
      >
        <div className="flex  h-full flex-col  pb-5 pt-20 backdrop-blur-3xl">
          <div id="logo" className="flex items-center justify-center space-x-3">
            <Image
              src={"/logo.svg"}
              alt={""}
              width={50}
              height={50}
              className={cn("rounded-full   backdrop-blur-3xl", {
                [""]: isClicked,
              })}
            />
            {true && (
              <p className={cn("text-2xl font-bold text-primary")}>BuzzHive</p>
            )}
          </div>
          <div className="flex h-full flex-col justify-between">
            <div
              id="Navbar items"
              className={cn("flex flex-col space-y-3 px-4 pt-10", {
                [""]: !isClicked,
              })}
            >
              <Link
                id="Items"
                className={cn(
                  "transition-color flex h-12 items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                  {
                    ["justify-start "]: !isClicked,
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
                    ["justify-start "]: !isClicked,
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
                    "transition-color flex h-12 items-center  space-x-2 rounded-full p-5   font-semibold text-foreground duration-300 hover:bg-primary hover:text-primary-foreground",
                    {
                      ["justify-start "]: !isClicked,
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
                    ["justify-start "]: !isClicked,
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
                    ["justify-start "]: !isClicked,
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
            <div
              className={cn("z-50 flex items-center justify-center", {
                ["rotate-180"]: isClicked,
                [" rotate-0 px-4"]: !isClicked,
              })}
              onClick={() => setisClicked(!isClicked)}
            >
              <ChevronLeftCircle
                color="white"
                size={40}
                className={cn(
                  "z-50 cursor-pointer transition-all duration-500 hover:scale-110 md:hidden ",
                  {
                    ["opacity-100 md:opacity-0"]: isHovering,
                    ["opacity-100"]: !isHovering,
                  },
                )}
              />
            </div>
            <div
              className={cn("px-5", {
                ["px-2"]: isClicked,
              })}
            >
              <Button
                className="mx-auto flex items-center gap-2 rounded-full transition-all hover:scale-110 hover:bg-primary/80"
                size="lg"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
