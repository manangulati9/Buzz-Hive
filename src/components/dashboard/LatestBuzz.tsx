"use client";

import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { Stars } from "lucide-react";

const LatestBuzz = () => {
  return (
    <div className="w-full max-w-md  md:max-w-3xl">
      <BackgroundGradient className="flex w-full max-w-md justify-between rounded-[22px] bg-black p-4 backdrop-blur-3xl dark:bg-zinc-900  md:max-w-3xl md:p-10">
        <p className="font-bold">Latest Buzz</p>
        <Stars color="gold " />
      </BackgroundGradient>
    </div>
  );
};

export default LatestBuzz;
