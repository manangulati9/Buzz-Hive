import PcSidebar from "@/components/layout/desktopSidebar";
import Sidebar from "@/components/layout/mobileSidebar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="md:mx-auto md:max-w-7xl">
        <PcSidebar />
        {children}
      </div>
      <BackgroundBeams className="fixed top-0" />
    </div>
  );
}
