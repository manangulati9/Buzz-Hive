import Navbar from "@/components/layout/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="bg-[#030712] md:container">
    <Navbar/>
    {children}
  </div>
}