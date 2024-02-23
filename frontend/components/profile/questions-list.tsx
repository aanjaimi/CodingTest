import React from "react";
import { Question } from "@/types/question";
import QuestionData from "../home/question-data";
import { User } from "@/types/user";

type QuestionsListProps = {
  questions: Question[] | undefined;
  user: User | null;
};

const MyQuestionsList = ({ questions, user }: QuestionsListProps) => {
  console.log(questions);
  return (
    <div className="w-full h-full flex flex-col">
      {questions?.length &&
        questions.map((question) => (
          <QuestionData key={question.id} question={question} user={user} />
        ))}
    </div>
  );
};

export default MyQuestionsList;
