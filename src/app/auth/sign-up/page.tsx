import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { SignUpForm } from "@/components/auth/sign-up-form"

export const metadata: Metadata = {
  title: "BuzzHive | Sign Up",
}

export default function AuthenticationPage() {
  return (
    <>
      <Link
        href="/auth/login"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-fit absolute top-2 md:top-8 md:right-8 right-0"
        )}>
        Login
      </Link>
      <div className={cn("w-full flex items-center pt-8 flex-col space-y-4 justify-center md:p-8")}>
        <div className="space-y-2 text-center hidden md:block">
          <h1 className="text-3xl font-semibold tracking-tight">
            Sign up
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill the form below to sign up
          </p>
        </div>
        <SignUpForm />
      </div>
    </>
  )
}
