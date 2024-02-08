"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { GoSearch } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { MdOutlineEmail, MdEmail } from "react-icons/md";
import { FaRegUser, FaUser } from "react-icons/fa6";
import { TbPencilPlus } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PostQuestion from "./post-question";

const SideBarIcons = () => {
  const [homeActive, setHomeActive] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [messagesActive, setMessagesActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);

  const setOff = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setHomeActive(false);
    setSearchActive(false);
    setNotificationsActive(false);
    setMessagesActive(false);
    setProfileActive(false);
    setter(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-end justify-start space-y-6 mr-[30px]">
      {/* Home */}
      <Button
        onClick={() => setOff(setHomeActive)}
        variant="ghost"
        className="lg:w-[120px] lg:h-[80x] w-16 h-16 lg:mr-[70px] flex-row flex items-center lg:justify-start justify-center border rounded-full border-none bg-white hover:bg-slate-200"
      >
        {homeActive ? (
          <IoHomeSharp className="w-5 h-5 lg:mr-[15px]" />
        ) : (
          <IoHomeOutline className="w-5 h-5 lg:mr-[15px]" />
        )}
        <span
          className={`text-[18px] mt-[4px] ${
            homeActive ? "font-bold" : ""
          } hidden lg:flex`}
        >
          Home
        </span>
      </Button>
      {/* Search */}
      <Button
        onClick={() => setOff(setSearchActive)}
        variant="ghost"
        className="lg:w-[140px] lg:h-[80x] w-16 h-16 lg:mr-[50px] flex-row flex items-center lg:justify-start justify-center border rounded-full border-none bg-white hover:bg-slate-200"
      >
        {searchActive ? (
          <FiSearch className="w-5 h-5 lg:mr-[15px]" />
        ) : (
          <GoSearch className="w-5 h-5 lg:mr-[15px]" />
        )}
        <span
          className={`text-[18px] mt-[4px] ${
            searchActive ? "font-bold" : ""
          } hidden lg:flex`}
        >
          Search
        </span>
      </Button>
      {/* Notifications */}
      <Button
        onClick={() => setOff(setNotificationsActive)}
        variant="ghost"
        className="lg:w-[180px] lg:h-[80x] w-16 h-16 lg:mr-[10px] flex flex-row items-center lg:justify-start justify-center border rounded-full border-none bg-white hover:bg-slate-200"
      >
        {notificationsActive ? (
          <IoMdNotifications className="w-5 h-5 lg:mr-[15px]" />
        ) : (
          <IoMdNotificationsOutline className="w-5 h-5 lg:mr-[15px]" />
        )}
        <span
          className={`text-[18px] mt-[4px] ${
            notificationsActive ? "font-bold" : ""
          } hidden lg:flex`}
        >
          Notifications
        </span>
      </Button>
      {/* Messages */}
      <Button
        onClick={() => setOff(setMessagesActive)}
        variant="ghost"
        className="lg:w-[160px] lg:h-[80x] w-16 h-16 lg:mr-[30px] flex flex-row items-center lg:justify-start justify-center border rounded-full border-none bg-white hover:bg-slate-200"
      >
        {messagesActive ? (
          <MdEmail className="w-5 h-5 lg:mr-[15px]" />
        ) : (
          <MdOutlineEmail className="w-5 h-5 lg:mr-[15px]" />
        )}
        <span
          className={`text-[18px] mt-[4px] ${
            messagesActive ? "font-bold" : ""
          } hidden lg:flex`}
        >
          Messages
        </span>
      </Button>
      {/* Profile */}
      <Button
        onClick={() => setOff(setProfileActive)}
        variant="ghost"
        className="lg:w-[140px] lg:h-[80x] w-16 h-16 lg:mr-[50px] flex flex-row items-center lg:justify-start justify-center border rounded-full border-none bg-white hover:bg-slate-200"
      >
        {profileActive ? (
          <FaUser className="w-5 h-5 lg:mr-[15px]" />
        ) : (
          <FaRegUser className="w-5 h-5 lg:mr-[15px]" />
        )}
        <span
          className={`text-[18px] mt-[4px] ${
            profileActive ? "font-bold" : ""
          } hidden lg:flex`}
        >
          Profile
        </span>
      </Button>
      {/* Post */}
      <Button
        variant="ghost"
        className="lg:w-[240px] lg:h-[80x] w-16 h-16 flex items-center justify-center border rounded-full bg-cyan-400 hover:bg-cyan-500"
      >
        <TbPencilPlus className="w-5 h-5 lg:mr-[15px] lg:hidden flex" />
        <span className="text-[18px] text-white mt-[4px] font-semibold hidden lg:flex">
          <Dialog>
            <DialogTrigger>Post</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription>
                  <PostQuestion />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </span>
      </Button>
    </div>
  );
};

export default SideBarIcons;
