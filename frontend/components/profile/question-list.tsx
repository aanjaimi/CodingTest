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
import { Skeleton } from "@/components/ui/skeleton";
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
import { useQuery } from "@tanstack/react-query";
import { Question } from "@/types/question";
import { fetcher } from "@/lib/utils";

const handleClick = () => {};

const GetQuestions = async () => {
  const resp = await fetcher.get<Question[]>("/questions");
  return resp.data;
};

const QuestionsList = () => {
  const { state } = useStateContext();
  const [questions, setQuestions] = useState<Question[] | []>([]);

  const questionQuery = useQuery({
    queryKey: ["questions"],
    retry: false,
    queryFn: async () => {
      const questions = await GetQuestions();
      setQuestions(questions);
      return questions;
    },
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[50%] flex flex-row border border-black bg-white hover:bg-slate-200">
        <PostQuestion />
      </div>
      {questions.length ? <div className="w-[50%] flex flex-row border border-black bg-white hover:bg-slate-200">
        {questions.map((question) => (
          <QuestionData key={question.id} />
        ))}
      </div> : <></>}
    </div>
  );
};

export default QuestionsList;
