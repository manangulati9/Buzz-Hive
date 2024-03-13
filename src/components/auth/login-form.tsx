"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import type { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/zodSchemas"
import { signIn } from "next-auth/react"
import { toast } from "../ui/use-toast"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const router = useRouter();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const signInResponse = await signIn('credentials', { ...values, redirect: false })

    if (signInResponse?.error) {
      console.log(signInResponse.error);
      toast({
        title: "Invalid email or password",
        description: "Please check your credentials and try again",
        variant: "destructive",
        duration: 2000,
      })
      return;
    }

    router.push("/dashboard")
  }

  const googleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  const githubSignIn = async () => {
    await signIn('github', { callbackUrl: '/dashboard' })
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl space-y-8">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="david278@gmail.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input {...field} placeholder="********" type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex place-content-center">
        <Button className="max-w-xs w-full" type="submit">
          {isSubmitting ?
            <>
              <Icons.spinner />
              Submitting...
            </> :
            <>
              Submit
            </>
          }
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <Button className="w-full" onClick={githubSignIn} variant="outline" type="button">
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button className="w-full" variant="outline" onClick={googleSignIn} type="button">
          <Icons.google className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </form>
  </Form>
}
