import Sidebar from "@/components/layout/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div>
    <Sidebar />
    {children}
  </div>
}
