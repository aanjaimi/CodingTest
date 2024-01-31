'use client';
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { Toggle } from "@/components/ui/toggle";
import { useStateContext } from "@/contexts/state-context";

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
  {
    id: "4",
    username: "Jane Doe",
    likes: 40,
    answers: 20,
    liked: true,
    title: "How to make a Rails app?",
    content: "I want to make a Rails app. How do I do it?",
    location: "Tokyo, Japan",
  },
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

  console.log('user: ', state.user);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="mt-[60px] text-[40px] font-bold space-y-12">
        List of Questions
      </h1>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex space-y-6 flex-col items-center justify-center ">
          {questions.map((question) => (
            <Card key={question.id} className="sm:w-[600px] w-[400px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{question.username}</CardTitle>
                <CardTitle>{question.title}</CardTitle>
              </CardHeader>
              <hr className="w-[90%] border-black mx-[30px] font-bold " />
              <br />
              <CardContent className="flex items-center justify-center">
                {question.content}
              </CardContent>
              <div className="flex justify-end mr-[30px] mb-[20px]">
                {question.location}
              </div>
              <hr className="w-[90%] border-black mx-[30px] font-bold " />
              <br />
              <CardFooter className="flex justify-between">
                <Toggle variant="outline">
                  <Button variant="ghost">
                    {!question.liked && <BiLike className="w-[20px]" />}
                    {!question.liked && <span>Like</span>}
                    {question.liked && <BiSolidLike className="w-[20px]" />}
                    {question.liked && <span>unlike</span>}
                  </Button>
                </Toggle>
                <Toggle variant="outline">
                  <Button variant="ghost">
                    <FaRegHeart className="w-[20px]" />
                    Add to favorite
                  </Button>
                </Toggle>
                <Toggle variant="outline">
                  <Button variant="ghost">
                    <FaRegComment className="w-[20px]" />
                    Answer
                  </Button>
                </Toggle>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
