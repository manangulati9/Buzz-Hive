import Sidebar from "@/components/layout/mobileSidebar";
import { BackgroundBeams } from "@/components/ui/background-beams";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div>
    <Sidebar />
    {children}
    <BackgroundBeams/>
  </div>
}
