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
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "../ui/button";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPersonAdd } from "react-icons/io";
import { RiVolumeMuteFill } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { Toggle } from "@/components/ui/toggle";
import { useStateContext } from "@/contexts/state-context";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import QuestionData from "./question-data";
import SkeletonDemo from "./skeleton-demo";
import PostQuestion from "./post-question";

export const questions = [
  {
    id: "1",
    username: "John Doe",
    likes: 10,
    answers: 5,
    liked: true,
    title: "How to make a React app?",
    content: "I want to make a React app. How do I do it?",
    location: "London, UK",
  },
  {
    id: "2",
    username: "Jane Doe",
    likes: 20,
    answers: 10,
    liked: false,
    title: "How to make a Django app?",
    content: "I want to make a Django app. How do I do it?",
    location: "Paris, France",
  },
  {
    id: "3",
    username: "John Doe",
    likes: 30,
    answers: 15,
    liked: false,
    title: "How to make a Node app?",
    content: "I want to make a Node app. How do I do it?",
    location: "New York, USA",
  },
  // {
  //   id: "4",
  //   username: "Jane Doe",
  //   likes: 40,
  //   answers: 20,
  //   liked: true,
  //   title: "How to make a Rails app?",
  //   content: "I want to make a Rails app. How do I do it?",
  //   location: "Tokyo, Japan",
  // },
  // {
  //   id: "4",
  //   username: "Jane Doe",
  //   likes: 40,
  //   answers: 20,
  //   title: "How to make a Rails app?",
  //   content: "I want to make a Rails app. How do I do it?",
  //   location: "Tokyo, Japan",
  // },
];

const handleClick = () => {};

const QuestionsList = () => {
  const { state } = useStateContext();

  console.log(state.user);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[50%] flex flex-row border border-black bg-white hover:bg-slate-200">
        <PostQuestion />  
      </div>
      <div className="w-[50%] flex flex-row border border-black bg-white hover:bg-slate-200">
        {!state.user ? <SkeletonDemo /> : <QuestionData />}
      </div>
    </div>
  );
};

export default QuestionsList;
