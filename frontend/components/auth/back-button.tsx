'use client';

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  label: string;
  href: string;
  variant: "default" | "destructive" | "secondary" | "outline" | "link" | "ghost";
}

const BackButton = ({ label, href, variant }: BackButtonProps) => {
  return (
    <Button
      size="lg"
      className="font-normal"
      variant={variant}
      asChild
    >
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
};

export default BackButton;