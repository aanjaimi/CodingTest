"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/types/user";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { PiBalloonThin } from "react-icons/pi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getQuestionsOfUser } from "@/actions/question";
import Image from "next/image";
import EditProfile from "./edit-profile";
import { getFollowers, getFollowing } from "@/actions/follow";
import { Question } from "@/types/question";
import { Button } from "../ui/button";

function formatDateOfBirth(date: Date | undefined) {
  if (!date) return null;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const month = formattedDate.split(" ")[0];
  const day = formattedDate.split(" ")[1].replace(",", "");

  return `Born ${month} ${day}, ${new Date(date).getFullYear()}`;
}

type ProfileDataProps = {
  user: User | null;
};

const ProfileData = ({ user }: ProfileDataProps) => {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      getQuestionsOfUser(user.id).then((res) => {
        setQuestions(res);
      });
      getFollowers(user.id).then((res) => {
        setFollowers(res);
      });
      getFollowing(user.id).then((res) => {
        setFollowing(res);
      });
    }
  }, [user]);

  const date = user?.createdAt.slice(0, 10) as string;
  const data = new Date(date);
  const joinedYear = data.getFullYear();
  const formattedDate = data.toLocaleDateString("default", {
    month: "long",
  });

  if (user === undefined) return null;
  return (
    <div className="w-full h-full flex flex-col">
      {/* header of profile */}
      <div className="w-full flex py-1 px-2">
        {/* Back button */}
        <div
          onClick={() => router.back()}
          className="w-[36px] h-[36px] flex justify-center items-center rounded-full hover:bg-slate-200 mt-[6px]"
        >
          <IoMdArrowRoundBack className="w-6 h-6" />
        </div>
        {/* displayname and number of questions */}
        <div className="flex flex-col ml-[30px]">
          <div className="text-[20px] font-bold">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-[14px]">{questions.length} questions</div>
        </div>
      </div>
      {/* profile informations */}
      <div className="relative w-full flex flex-col">
        <Image src="/cover.png" alt="cover image" width={1000} height={80} />
        <div className="w-[110px] h-[110px] p-1 absolute mt-[100px] ml-[20px] rounded-full bg-white">
          <Image
            src="/default-avatar.png"
            alt="cover image"
            width={120}
            height={120}
            className="bg-white hover:bg-slate-200 rounded-full"
          />
        </div>
        <div className="flex items-start justify-end p-4">
          <EditProfile />
        </div>
        <div className="p-4 flex flex-col space-y-4">
          <div>
            <div className="text-[20px] font-bold">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-slate-600">@{user?.username}</div>
          </div>
          {user?.bio && <div className="text-slate-600">{user?.bio}</div>}
          <div className="flex items-center mt-2 space-x-4 text-slate-600">
            {user?.location && (
              <div className="flex items-center justify-center ">
                <IoLocationOutline className="text-slate-600" />
                <div className="text-slate-600 ml-1">{user?.location}</div>
              </div>
            )}
            {user?.birthday && (
              <div className="flex items-center justify-center">
                <PiBalloonThin className="text-slate-600" />
                <div className="text-slate-600 ml-1">
                  {formatDateOfBirth(user.birthday)}
                </div>
              </div>
            )}
            <div className="flex items-center justify-center">
              <MdOutlineCalendarMonth className="text-slate-600" />
              <div className="text-slate-600 ml-1">
                Joined {formattedDate} {joinedYear}
              </div>
            </div>
          </div>
          <div className="flex space-x-8 text-slate-600">
            <div>
              <span className="text-black font-bold">{following.length}</span>{" "}
              Following
            </div>
            <div>
              <span className="text-black font-bold">{followers.length}</span>{" "}
              Followers
            </div>
          </div>
        </div>
        {/* posts and questions */}
        <div className="w-full h-full flex">
          <div className="w-1/3 bg-white">
            <Button
              variant="secondary"
              className="w-full rounded-none bg-white hover:bg-slate-100"
            >
              Questions
            </Button>
          </div>
          <div className="w-1/3 bg-white">
            <Button
              variant="secondary"
              className="w-full rounded-none bg-white hover:bg-slate-100"
            >
              Answers
            </Button>
          </div>
          <div className="w-1/3 bg-white">
            <Button
              variant="secondary"
              className="w-full rounded-none bg-white hover:bg-slate-100"
            >
              Likes
            </Button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
