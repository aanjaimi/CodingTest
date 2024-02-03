"use client";
import React from "react";
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

const PostQuestion = () => {
  const { state } = useStateContext();
  const [title, setTitle] = React.useState("");

  const firstNameLetter = state.user?.firstName[0].toUpperCase();
  const lastNameLetter = state.user?.lastName[0].toUpperCase();
  return (
    <div className="w-full h-full flex">
      {/* avatar */}
      <div className="flex justify-center items-start mt-[10px] ml-[10px]">
        <Avatar>
          <AvatarImage src={state.user?.avatar.path} />
          <AvatarFallback>
            {firstNameLetter}
            {lastNameLetter}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* content */}
      <div className="w-full space-y-6">
        <h1 className="text-[20px] font-bold flex items-center"><span>{title}</span></h1>
        <Textarea
          name="questionTitle"
          placeholder="What's your question title?"
          className="text-[20px] border-none hover:border-none"/>
        {/* <Textarea
          name="questionContent"
          placeholder="What's your question?"
          className="text-[20px] border-none hover:border-none"/> */}
        <div className="flex justify-between">
          <Button variant="secondary">Cancel</Button>
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
};

export default PostQuestion;
