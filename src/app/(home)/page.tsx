import { SignOutButton } from "@/components/SignOutButton";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession()

  const isLoggedIn = !!session

  return <div>
    {isLoggedIn ?
      <SignOutButton /> :
      <Link href="/auth/login">Sign in</Link>
    }
    <Link href="/dashboard">Dashboard</Link>
  </div>
}
