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
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/zodSchemas"
import { api } from "@/trpc/react"
import { createClient } from "@/server/auth/client"
import { getBaseURL } from "@/lib/utils"

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate } = api.auth.loginWithEmail.useMutation()
  const supabase = createClient();

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values)
  }

  const baseURL = getBaseURL();
  const redirectURL = `${baseURL}/api/auth/callback`
  console.log(redirectURL)

  const googleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectURL
      }
    })
  }

  const githubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectURL
      }
    })
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
        <Button className="max-w-xs w-full" type="submit">Submit</Button>
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
