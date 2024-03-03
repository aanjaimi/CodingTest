"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdPersonAdd } from "react-icons/io";
import { RiVolumeMuteFill } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { IoFlag } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { Button } from "../ui/button";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { useStateContext } from "@/contexts/state-context";
import { Question } from "@/types/question";
import { addLike, getLike, removeLike } from "@/actions/like";
import { addFavorite, getFavorite, removeFavorite } from "@/actions/favorite";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { User } from "@/types/user";
import ProfileDialog from "../profile/profile-dialog";

type QuestionDataProps = {
  question: Question;
  user: User | null;
};

const QuestionData = ({ question, user }: QuestionDataProps) => {
  const { state } = useStateContext();
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [answerValue, setAnswerValue] = useState("");
  const firstNameLetter = user?.firstName[0].toUpperCase();
  const lastNameLetter = user?.lastName[0].toUpperCase();
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
        console.log(err);
      });
    getFavorite(state?.user?.id, question)
      .then((res) => {
        setFavorite(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.user, question]);

  const handleClickLike = () => {
    if (!state?.user?.id) return;
    if (!like) {
      addLike(state?.user?.id, question)
        .then((res) => {
          
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeLike(state?.user?.id, question)
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setLike(!like);
  };

  const handleClickFavorite = () => {
    if (!state?.user?.id) return;
    if (!favorite) {
      addFavorite(state?.user?.id, question)
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeFavorite(state?.user?.id, question)
        .then((res) => {
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setFavorite(!favorite);
  };

  const handleClickAnswer = () => {
    setAnswer(!answer);
  };

  const handleOnChangeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value != "") {
      setAnswerValue(e.target.value);
      setDisabled(false);
    } else setDisabled(true);
  };

  return (
    <div className="w-full flex border border-slate-100 bg-white hover:bg-slate-200">
      {/* avatar */}
      <div className="w-[10%] flex justify-center items-start mt-[10px]">
        <Avatar>
          <AvatarImage src={user?.avatar.path} />
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
              {user?.firstName} {user?.lastName}
            </div>
            <div className="ml-[6px] text-slate-500">@{user?.username}</div>
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
                    Add @{user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <RiVolumeMuteFill className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Mute @{user?.username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex flex-row items-center">
                  <MdBlock className="w-6 h-6 mr-[6px]" />
                  <span className="flex items-end justify-center">
                    Block @{user?.username}
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
            <span className="ml-[2px]">{question.questionLikes?.length}</span>
          </Button>
          <Button
            onClick={handleClickFavorite}
            variant="ghost"
            className="hover:bg-blue-200"
          >
            {!favorite ? <FaRegStar /> : <FaStar />}
            <span className="ml-[2px]">{question?.favorites?.length}</span>
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
              <div className="flex flex-col items-start space-y-6">
                <h1 className="font-bold text-">Your answer</h1>
                <Textarea
                  className="w-[80%] h-[100px] border border-slate-100 rounded-lg"
                  placeholder="Post your answer"
                  onChange={handleOnChangeAnswer}
                ></Textarea>
                <div className="w-[80%] flex justify-end">
                  <Button disabled={disabled} variant="default">
                    Submit
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default QuestionData;
