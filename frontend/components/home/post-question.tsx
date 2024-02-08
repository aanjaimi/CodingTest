"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema } from "@/schemas";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AddQuestion } from "@/actions/question";

const PostQuestion = () => {
  const { state } = useStateContext();
  const [value, setValue] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

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

  const checkFields = () => {
  
    const disableButton = !title || !content;

    setIsButtonDisabled(disableButton);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    const disableButton = !e.target.value;
    checkFields();
    setIsButtonDisabled(disableButton);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const disableButton = !e.target.value;
    checkFields();
    setIsButtonDisabled(disableButton);
  };

  const onSubmit = async (data: z.infer<typeof PostSchema>) => {
    await AddQuestion(data);
    form.reset();
  };

  return (
    <div className="w-full h-full flex">
      {/* avatar */}
      <div className="w-[10%] flex justify-center items-start mt-[10px]">
        <Avatar className="border border-black">
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
                        onChange={handleTitleChange}
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
                        onChange={handleContentChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <span className="flex justify-end">
                <Button disabled={isButtonDisabled} type="submit">
                  Post
                </Button>
              </span>
              <div></div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PostQuestion;
