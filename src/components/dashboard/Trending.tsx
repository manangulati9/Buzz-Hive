"use client";

import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { Flame } from "lucide-react";

const Trending = () => {
  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <BackgroundGradient className="flex w-full max-w-xs justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
        <p className="font-bold">Trending</p>
        <Flame color="gold " />
      </BackgroundGradient>
    </div>
  );
};

export default Trending;
