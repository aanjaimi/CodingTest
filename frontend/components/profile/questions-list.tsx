import React from "react";
import { Question } from "@/types/question";
import QuestionData from "../home/question-data";
import { User } from "@/types/user";
import { ScrollArea } from "../ui/scroll-area";

type QuestionsListProps = {
  questions: Question[];
  user: User | null;
};

const MyQuestionsList = ({ questions, user }: QuestionsListProps) => {
  return (
    <ScrollArea className="bg-orange-500 w-full h-full flex flex-col border border-red-500">
      {questions?.length > 0 ? (
        questions.map((question) => (
          <QuestionData key={question.id} question={question} user={user} />
        ))
      ) : (
        <></>
      )}
    </ScrollArea>
  );
};

export default MyQuestionsList;
