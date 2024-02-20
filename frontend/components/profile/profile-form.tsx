"use client";
import React, { useState } from "react";
import * as z from "zod";
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
import { EditProfileSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/contexts/state-context";
import { Textarea } from "../ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { updateUser } from "@/actions/user";

const ProfileForm = () => {
  const router = useRouter();
  const { state } = useStateContext();
  const [date, setDate] = useState<Date | undefined>(
    state.user?.birthday || new Date()
  );
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: state.user?.firstName || "",
      lastName: state.user?.lastName || "",
      bio: state.user?.bio || "",
      location: state.user?.location || "",
      birthday: state.user?.birthday || new Date(),
    },
  });

  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
    setError("");
    setSuccess("");

    const user = await updateUser(state?.user?.id, data);

    if (user) {
      setSuccess("Profile updated successfully");
      form.reset();
      router.push(`/profile/${state?.user?.id}`);
    } else {
      setError("An error occured while updating your profile");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl {...field}>
                    <Input
                      {...field}
                      type="text"
                      placeholder="first name"
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
                  <FormLabel>Last name</FormLabel>
                  <FormControl {...field}>
                    <Input
                      {...field}
                      type="text"
                      placeholder="last name"
                      className="font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl {...field}>
                    <Textarea
                      {...field}
                      placeholder="Bio"
                      className="font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl {...field}>
                    <Textarea
                      {...field}
                      placeholder="location"
                      className="font-normal"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="birthday"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-fit">
                  <FormLabel>Birth date</FormLabel>
                  <FormControl {...field}>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-[4px] flex items-end justify-end">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" className="">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
