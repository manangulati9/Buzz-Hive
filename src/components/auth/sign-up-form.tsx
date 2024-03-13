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
import { CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "../ui/use-toast"

type UsernameDescProps = {
  lastUsername: string;
  isUsernameValid: boolean;
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

  const router = useRouter();
  const username = form.watch("username");
  const [didVerifyOnce, setDidVerifyOnce] = React.useState(false);
  const [lastUsername, setLastUsername] = React.useState("");
  const [isUsernameValid, setIsUsernameValid] = React.useState(false);
  const { isFetching, refetch } = api.auth.isUsernameAvailable.useQuery(username, { enabled: false, retry: false });
  const getDescription = () => isFetching ? "Checking..." : <UsernameDesc isUsernameValid={isUsernameValid} lastUsername={lastUsername} />;
  const shouldRefetch = username !== "" && username !== lastUsername;

  const { mutate, isLoading, error: signUpError } = api.auth.signUpWithEmail.useMutation();

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    if (isUsernameValid) {
      mutate(values);

      if (!signUpError) {
        router.push("/dashboard");
        return;
      }

      toast({
        title: signUpError.message,
        description: "Please check your credentials and try again",
        variant: "destructive"
      })
    }
  }

  const verify = async () => {
    const result = await refetch();

    if (result.isError) {
      form.setError("username", { type: "invalid_username", message: result.error.message })
      setIsUsernameValid(false)
    } else {
      setIsUsernameValid(true)
    }

    setLastUsername(username);
    setDidVerifyOnce(true);
  }

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl space-y-2">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="David Johnson" {...field} />
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
                <Button variant="outline" onClick={verify} disabled={!shouldRefetch}>Check</Button>
              </div>
            </FormControl>
            <div className="flex text-muted-foreground text-[0.8em] items-center gap-2">
              {didVerifyOnce ? getDescription() : "Check username availability"}
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
              <Icons.spinner />
              Submitting...
            </>
            : "Submit"}
        </Button>
      </div>
    </form>
  </Form>
}

function UsernameDesc(props: UsernameDescProps) {
  const { isUsernameValid, lastUsername } = props;

  return !isUsernameValid ?
    <>
      <XCircle className="h-4 w-4" stroke="red" />
      <p className="text-red-600">
        {`${lastUsername} already exists`}
      </p>
    </>
    :
    <>
      <CheckCircle className="h-4 w-4" stroke="green" />
      <p className="text-green-600">
        {`${lastUsername} is available`}
      </p>
    </>
}
