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
import { ResetSchema } from "@/schemas";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/navigation";

const sendResetEmail = async (email: string) => {
  const data = await fetcher.post(process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/reset", {
    email: email,
  });

  return data.data;
};

const ResetForm = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    const values = await sendResetEmail(data.email);
    const { error, success } = values as { error: string; success: string };
    console.log("values: ", values);
    if (success) {
      setSuccess(success);
      form.reset();
    }
    if (error) {
      setError(error);
    }
  };

  return (
    <CardWrapper
      headerLabel="Forget your password?"
      backButtonLabel="Back to login"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
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
          </div>
          <div className="space-y-4">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Send reset email
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetForm;
