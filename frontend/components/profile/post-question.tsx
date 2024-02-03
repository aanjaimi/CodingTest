"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPersonAdd } from "react-icons/io";
import { RiVolumeMuteFill } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useStateContext } from "@/contexts/state-context";
import { Textarea } from "../ui/textarea";
import { ComboboxDemo } from "../ui/combobox";
import { topics } from "@/constants/topic";
import { fetcher } from "@/lib/utils";
import { Topic } from "@/types/topic";
import { User } from "@/types/user";
import { Question } from "@/types/question";
import { set } from "zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/schemas";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const PostQuestion = () => {
  const { state } = useStateContext();
  const [title, setTitle] = useState<string | null>(null);
  const [titleDisplay, setTitleDisplay] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const firstNameLetter = state.user?.firstName[0].toUpperCase();
  const lastNameLetter = state.user?.lastName[0].toUpperCase();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      topic: "Global",
      title: "",
      content: "",
    },
  });

  const onSubmit = (data: z.infer<typeof PostSchema>) => {
    // if (content === null || content === "") {
    //   return;
    // }
    try {
      AddQuestion(data);
    } catch (error) {
      console.error("this error: ", error);
    }
  };

  return (
    <div className="w-full h-full flex">
      {/* avatar */}
      <div className="w-[10%] flex justify-center items-start mt-[10px]">
        <Avatar>
          <AvatarImage src={state.user?.avatar.path} />
          <AvatarFallback>
            {firstNameLetter}
            {lastNameLetter}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* content */}
      <div className="w-[90%] mt-[10px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[90%] flex flex-col space-y-4"
          >
            <div className="space-y-4">
              <FormField
                name="topic"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl {...field}>
                      <ComboboxDemo
                        topics={topics}
                        value={value}
                        setValue={setValue}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl {...field}>
                      <Input
                        {...field}
                        type="text"
                        placeholder="What's your question title?"
                        className="font-normal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl {...field}>
                      <Textarea
                        {...field}
                        placeholder="What's your question?"
                        className="font-normal"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <Button type="submit" className="w-full">
                Post
              </Button>
              <div></div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostQuestion;
