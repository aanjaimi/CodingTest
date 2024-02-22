"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { Question } from "@/types/question";
import { addLike, getLike, removeLike } from "@/actions/like";
import { addFavorite, getFavorite, removeFavorite } from "@/actions/favorite";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

type QuestionDataProps = {
  question: Question;
};

const QuestionData = ({ question }: QuestionDataProps) => {
  const { state } = useStateContext();
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const firstNameLetter = question.user?.firstName[0].toUpperCase();
  const lastNameLetter = question.user?.lastName[0].toUpperCase();
  const date = question?.createdAt.slice(0, 10) as string;
  const time = question?.createdAt.slice(11, 16);
  const data = new Date(date);
  const formattedDate = data.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  useEffect(() => {
    if (!state?.user?.id) return;
    getLike(state?.user?.id, question)
      .then((res) => {
        setLike(res);
      })
      .catch((err) => {
        console.log("Get like failed: ", err);
      });
    getFavorite(state?.user?.id, question)
      .then((res) => {
        setFavorite(res);
      })
      .catch((err) => {
        console.log("Get favorite failed: ", err);
      });
  }, [state.user, question]);

  const handleClickLike = () => {
    if (!state?.user?.id) return;
    if (!like) {
      addLike(state?.user?.id, question)
        .then((res) => {
          console.log("Add successfully: ", res);
        })
        .catch((err) => {
          console.log("Add failed: ", err);
        });
    } else {
      removeLike(state?.user?.id, question)
        .then((res) => {
          console.log("Remove successfully: ", res);
        })
        .catch((err) => {
          console.log("Remove failed: ", err);
        });
    }
    setLike(!like);
  };

  const handleClickFavorite = () => {
    if (!state?.user?.id) return;
    if (!favorite) {
      addFavorite(state?.user?.id, question)
        .then((res) => {
          console.log("Add successfully: ", res);
        })
        .catch((err) => {
          console.log("Add failed: ", err);
        });
    } else {
      removeFavorite(state?.user?.id, question)
        .then((res) => {
          console.log("Remove successfully: ", res);
        })
        .catch((err) => {
          console.log("Remove failed: ", err);
        });
    }
    setFavorite(!favorite);
  };

  const handleClickAnswer = () => {
    setAnswer(!answer);
  };

  return (
    <div className="w-full h-full flex border border-slate-100 bg-white hover:bg-slate-200">
      {/* avatar */}
      <div className="w-[10%] flex justify-center items-start mt-[10px]">
        <Avatar>
          <AvatarImage src={question.user?.avatar.path} />
          <AvatarFallback>
            {firstNameLetter}
            {lastNameLetter}
          </AvatarFallback>
        </Avatar>
      </div>
      {/* content */}
      <div className="w-[90%] flex flex-col">
        <div className="w-full flex justify-between mt-[10px]">
          <div className="flex mt-[5px]">
            <div className="flex font-bold">
              {question.user?.firstName} {question.user?.lastName}
            </div>
            <div className="ml-[6px] text-slate-500">
              @{question.user?.username}
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
                    Add @{question.user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <RiVolumeMuteFill className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Mute @{question.user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <MdBlock className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Block @{question.user?.username}
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
          <h1 className="font-bold ml-[10px]">{question.title}</h1>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-start">{question.content}</div>
          </div>
        </div>
        {/* Question reacts and answers */}
        <div className="flex space-x-4 justify-between mr-[50px] my-[10px]">
          <Button
            onClick={handleClickLike}
            variant="ghost"
            className="hover:bg-blue-200"
          >
            {!like ? <BiLike /> : <BiSolidLike />}
            <span className="ml-[2px]">{!like ? <>Like</> : <>Unlike</>}</span>
          </Button>
          <Button
            onClick={handleClickFavorite}
            variant="ghost"
            className="hover:bg-blue-200"
          >
            {!favorite ? <FaRegStar /> : <FaStar />}
            <span className="ml-[2px]">
              {!favorite ? <>Add to favorite</> : <>Remove from favorite</>}
            </span>
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button
                onClick={handleClickAnswer}
                variant="ghost"
                className="hover:bg-blue-200"
              >
                <FaRegComment />
                <span className="ml-[2px]">Answer</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col items-start">
                <h1 className="font-bold text-">Your answer</h1>
                <Textarea
                  className="w-[80%] h-[100px] border border-slate-100 rounded-lg"
                  placeholder="Post your answer"
                ></Textarea>
                <Button
                  disabled={disabled}
                  variant="default"
                  className="w-[80%] mt-[10px] hover:bg-blue-200"
                >
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default QuestionData;
