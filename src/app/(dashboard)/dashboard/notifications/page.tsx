import Notificationlist from "@/components/dashboard/notifications/Notificationlist";
import React from "react";

function Page() {
  return (
    <div className="container flex h-[100dvh] max-w-md items-center justify-between py-10 pt-24 md:max-w-2xl md:pt-0">
      <Notificationlist />
    </div>
  );
}

export default Page;
