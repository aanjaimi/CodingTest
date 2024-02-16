'use client';
import PageStructure from "@/components/home/page-structure";
import QuestionsList from "@/components/home/question-list";
import React from "react";

const HomePage = () => {
  return (
    <PageStructure component={QuestionsList} />
  );
};

export default HomePage;
