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

const userExist = async (email: string, username: string) => {
  const data = await fetcher.get(
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/check-existing",
    {
      params: {
        email: email,
        username: username,
      },
    }
  );

  return data.data;
};

const register = async (data: z.infer<typeof RegisterSchema>) => {
  const resp = await fetcher.post<User | null>(
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/register",
    {
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    }
  );

  return resp.data;
};

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    const { error } = await userExist(data.email, data.username);

    if (error) {
      setError(error);
      return;
    }
    const user = await register(data);
    if (user) {
      form.reset();
      setSuccess("Account created successfully. Please login to continue.");
    }
    if (!user) setError("Wrong Credentials");
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
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl {...field}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="username"
                    className="font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl {...field}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="john"
                    className="font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl {...field}>
                  <Input
                    {...field}
                    type="text"
                    placeholder="doe"
                    className="font-normal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
