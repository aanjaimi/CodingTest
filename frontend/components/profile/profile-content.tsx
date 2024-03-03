import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import MyQuestionsList from "./questions-list";
import { Question } from "@/types/question";

type ProfileContentProps = {
  user: User | null;
};

const ProfileContent = ({ user }: ProfileContentProps) => {
  const [question, setQuestion] = useState(true);
  const [answer, setAnswer] = useState(false);
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (user) setQuestions(user?.questions);
    else setQuestions([]);
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex">
        <div className="w-1/4 bg-white">
          <Button
            onClick={() => {
              setQuestion(true);
              setAnswer(false);
              setLike(false);
              setFavorite(false);
            }}
            variant="secondary"
            className="w-full rounded-none bg-white hover:bg-slate-100"
          >
            Questions
          </Button>
        </div>
        <div className="w-1/4 bg-white">
          <Button
            onClick={() => {
              setQuestion(false);
              setAnswer(true);
              setLike(false);
              setFavorite(false);
            }}
            variant="secondary"
            className="w-full rounded-none bg-white hover:bg-slate-100"
          >
            Answers
          </Button>
        </div>
        <div className="w-1/4 bg-white">
          <Button
            onClick={() => {
              setQuestion(false);
              setAnswer(false);
              setLike(true);
              setFavorite(false);
            }}
            variant="secondary"
            className="w-full rounded-none bg-white hover:bg-slate-100"
          >
            Likes
          </Button>
        </div>
        <div className="w-1/4 bg-white">
          <Button
            onClick={() => {
              setQuestion(false);
              setAnswer(false);
              setLike(false);
              setFavorite(true);
            }}
            variant="secondary"
            className="w-full rounded-none bg-white hover:bg-slate-100"
          >
            Favorites
          </Button>
        </div>
      </div>
      <div className="w-full h-full">
        {question && (
          <MyQuestionsList questions={questions} user={user} />
        )}
        {answer && <div>Answers</div>}
        {like && <div>Likes</div>}
        {favorite && <div>Favorites</div>}
      </div>
    </div>
  );
};

export default ProfileContent;
