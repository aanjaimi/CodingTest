"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import HeaderPage from "./header";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) => {
  return (
    <Card className="sm:w-[400px] w-[300px]">
      <CardHeader>
        <HeaderPage label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center justify-around">
        <BackButton label={backButtonLabel} href={backButtonHref} variant="link" />
        {backButtonHref === "/register" && 
          <BackButton label="Reset your password" href="/reset" variant="link" />
        }
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;