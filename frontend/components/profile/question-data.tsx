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

const QuestionData = () => {
  const { state } = useStateContext();

  console.log(state.user?.createdAt);

  const firstNameLetter = state.user?.firstName[0].toUpperCase();
  const lastNameLetter = state.user?.lastName[0].toUpperCase();
  const date = state.user?.createdAt.slice(0, 10) as string;
  const time = state.user?.createdAt.slice(11, 16);
  const data = new Date(date);
  const formattedDate = data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between mt-[10px] ml-[10px]">
          <div className="flex mt-[5px]">
            <div className="flex font-bold">
              {state.user?.firstName} {state.user?.lastName}
            </div>
            <div className="ml-[6px] text-slate-500">
              @{state.user?.username}
            </div>
            <div className="ml-[6px] text-slate-500">{formattedDate}</div>
            <div className="ml-[6px] text-slate-500">{time}</div>
          </div>
          <div className="flex justify-start items-start mr-[10px]">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-200">
                <HiDotsHorizontal />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[180px]">
                <DropdownMenuLabel className="flex flex-row items-center">
                  <IoMdPersonAdd className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Add @{state.user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <RiVolumeMuteFill className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Mute @{state.user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <MdBlock className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Block @{state.user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <IoFlag className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Report post
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Question title and content */}
        <div className="ml-[10px] flex flex-col mr-[50px]">
          <h1 className="font-bold ml-[10px]">How to make a React app?</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-start">
              I want to make a React app. How do I do it?
            </div>
          </div>
        </div>
        {/* Question reacts and answers */}
        <div className="flex space-x-4 justify-between mr-[50px] my-[10px]">
          <Button variant="ghost" className="hover:bg-blue-200">
            <BiLike />
            <span className="">Like</span>
          </Button>
          <Button variant="ghost" className="hover:bg-blue-200">
            <FaRegStar />
            <span className="">Add to favorite</span>
          </Button>
          <Button variant="ghost" className="hover:bg-blue-200">
            <FaRegComment />
            <span className="">Answer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionData;
