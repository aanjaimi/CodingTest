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
import { ResetPasswordSchema } from "@/schemas";
import { fetcher } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ParsedUrlQuery } from "querystring";

export const getServerSideProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return {
    props: {
      token: query.token,
    },
  };
};

const changePassword = async (password: string, token: string | undefined) => {
  if (token === undefined) {
    return { error: "Could not reset password" };
  }
  const data = await fetcher.post(process.env.NEXT_PUBLIC_BACKEND_ORIGIN + "/auth/reset-password", {
    password: password,
    token: token,
  });

  return data.data;
};

interface PasswordResetFormProps {
  token?: string;
}

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const router = useRouter();
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setError("");
    setSuccess("");

    await changePassword(data.password, token);
  
    setSuccess("Password changed successfully");
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
          <div className="space-y-6">
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
          </div>
          <div className="space-y-4">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default PasswordResetForm;
