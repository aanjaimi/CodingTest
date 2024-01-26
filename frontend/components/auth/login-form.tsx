"use client";
import React, { Dispatch, SetStateAction, useTransition } from "react";
import * as z from "zod";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { LoginSchema } from "@/schemas";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/navigation";

const login = async (
  email: string,
  password: string,
  setError: Dispatch<SetStateAction<string | undefined>>,
  setSuccess: Dispatch<SetStateAction<string | undefined>>
) => {
  const data = await fetcher.get(process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/login", {
    params: {
      email: email,
      password: password,
    },
  });

  return data.data;

  // const { error, success } = data.data as { error: string; success: string };

  // if (error) {
  //   setError(error);
  //   return;
  // }

  // setSuccess(success);
};

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    const values = await login(data.email, data.password, setError, setSuccess);
    const { error, success } = values as { error: string; success: string };
    if (success) {
      setSuccess(success);
      form.reset();
      router.push("/profile");
    }
    if (error) {
      setError(error);
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      backButtonLabel="Don’t have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl {...field}>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
                      className="font-normal"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl {...field}>
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      className="font-normal"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="pt-[4px]">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
