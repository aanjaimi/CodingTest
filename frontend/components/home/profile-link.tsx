"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useStateContext } from "@/contexts/state-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiDotsHorizontal } from "react-icons/hi";
import { logOut } from "@/actions/user";
import { toast } from "sonner";

const ProfileLink = () => {
  const { state } = useStateContext();

  const handleLogOut = async () => {
    const resp = await logOut();
    if (resp == true)
      toast.success("Logged out successfully");
    else
      toast.error("Error logging out");
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="rounded-full lg:w-[240px] lg:h-[80x] w-16 h-16 flex flex-row justify-around space-x-2 mb-[20px] bg-white hover:bg-slate-200">
          <div className="flex items-center justify-center">
            <Avatar className="border border-black">
              <AvatarImage src={state.user?.avatar.path} />
              <AvatarFallback>
                {state.user?.firstName[0]}
                {state.user?.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="lg:flex hidden flex-col items-start justify-center">
            <p className="text-[16px] font-bold">
              {state.user?.firstName} {state.user?.lastName}
            </p>
            <p className="text-[14px] text-slate-400">
              @{state.user?.username}
            </p>
          </div>
          <div className="lg:flex hidden items-center justify-center">
            <HiDotsHorizontal />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="font-bold bg-white hover:bg-slate-100 cursor-pointer" onClick={handleLogOut}>
        Log out @{state.user?.username}
      </PopoverContent>
    </Popover>
  );
};

export default ProfileLink;
