import Sidebar from "@/components/layout/sidebar";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/")
  }

  return <div>
    <Sidebar />
    {children}
  </div>
}
