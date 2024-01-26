"use client";
import React, { useState } from "react";
import * as z from "zod";
import { fetcher } from "@/lib/utils";
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
import { RegisterSchema } from "@/schemas";
import type { User } from "@/types/user";
import { useRouter } from "next/navigation";

const userExist = async (email: string): Promise<boolean> => {
  return (
    await fetcher.get<boolean>(process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/check-existing", {
      params: {
        email: email,
      },
    })
  ).data;
};

const register = async (email: string, password: string) => {
  const data = await fetcher.post<User | null>(
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/register",
    {
      email: email,
      password: password,
    }
  );

  return data.data;
};

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    const ret = await userExist(data.email);

    console.log("ret: ", ret);

    if (ret) {
      setError("Email already exist");
      return;
    }
    const user = await register(data.email, data.password);
    if (user) {
      console.log("user exist");
      setSuccess("Account created successfully. Please login to continue.");
      router.push("/login");
      return;
    }

    setError("Wrong Credentials");
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="ConfirmPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl {...field}>
                  <Input
                    {...field}
                    type="password"
                    placeholder="******"
                    className="font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="pt-[4px]">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
