import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "BuzzHive | Login",
}

export default function AuthenticationPage() {
  return (
    <>
      <Link
        href="/auth/sign-up"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-fit absolute top-2 md:top-8 md:right-8 right-0"
        )}>
        Login
      </Link>
      <div className={cn("flex items-center w-full flex-col space-y-4 justify-center md:p-4 lg:p-8")}>
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Login
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and password below to login
          </p>
        </div>
        <LoginForm />
      </div>
    </>
  )
}
