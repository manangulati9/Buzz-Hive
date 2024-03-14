import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return <div className="flex flex-col items-center gap-8">
    <div className="space-y-4 text-center">
      <h1 className="text-6xl font-bold tracking-tighter text-red-600">Error signing in</h1>
      <div>
        <p className="text-muted-foreground">This email is already registered with a different account.</p>
        <p className="text-muted-foreground">Try signing in with email and password instead.</p>
      </div>
    </div>
    <Link href="/auth/login" className={buttonVariants({ variant: "default" })}>Sign in</Link>
  </div>
}
