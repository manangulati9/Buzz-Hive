"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm, useFormContext } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/trpc/react"
import { Icons } from "../ui/icons"
import { signUpSchema } from "@/lib/zodSchemas"
import { RouterOutputs } from "@/server/api/root"
import { CheckCircle, XCircle } from "lucide-react"

type UsernameDescProps = {
  data: RouterOutputs['auth']['isUsernameAvailable'] | undefined,
  isFetching: boolean;
  lastUsername: string;
}

export function SignUpForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const username = form.watch("username");
  const [lastUsername, setLastUsername] = React.useState(username);
  const { isFetching, data, refetch } = api.auth.isUsernameAvailable.useQuery(username, { keepPreviousData: true, enabled: false });

  const { mutate, isLoading } = api.auth.signUpWithEmail.useMutation();

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    mutate(values)
  }

  const verify = () => {
    const isUsernameValid = !form.getFieldState("username").invalid
    if (isUsernameValid && username !== "" && username !== lastUsername) {
      refetch();
      setLastUsername(username);
    }
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="David" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input {...field} placeholder="david278" />
                <Button variant="outline" onClick={verify} disabled={isFetching}>Check</Button>
              </div>
            </FormControl>
            <div className="flex gap-2 text-[0.8rem] text-muted-foreground items-center">
              {data === true && <CheckCircle className="h-4 w-4" stroke="green" />}
              <UsernameDesc lastUsername={lastUsername} isFetching={isFetching} data={data} />
            </div>
            <div className="flex gap-2 items-center">
              {data === false && <XCircle className="h-4 w-4" stroke="red" />}
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="david278@gmail.com" {...field} />
            </FormControl>
            <FormDescription>
              Enter your email
            </FormDescription>
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
              <Input type="password" placeholder="********" {...field} />
            </FormControl>
            <FormDescription>
              Choose a secure password
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <Input {...field} placeholder="********" />
            </FormControl>
            <FormDescription>
              Re-enter your password
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex place-content-center">
        <Button className="max-w-xs w-full" type="submit">
          {isLoading ?
            <>
              <Icons.spinner className="h-4 w-4" />
              Submitting...
            </>
            : "Submit"}
        </Button>
      </div>
    </form>
  </Form>
}

function UsernameDesc(props: UsernameDescProps) {
  const [desc, setDesc] = React.useState("Check username availability")
  const { setError, watch } = useFormContext()
  const { lastUsername, isFetching, data } = props;

  const usernameVal = watch("username") as string;

  React.useEffect(() => {
    if (isFetching) {
      setDesc('Checking...');
    }

    if (data === true) {
      setDesc(`${lastUsername} is available`)
    } else if (data === false) {
      setError("username", { message: `${lastUsername} isn't available. Please choose another username` }, { shouldFocus: true })
      setDesc("")
    }

  }, [data, isFetching, usernameVal])

  return <p className={cn({
    "text-green-600 font-semibold": data === true,
  })}>
    {desc}
  </p>
}
