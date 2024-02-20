import React, { useEffect, useState } from "react";
import { User } from "@/types/user";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { PiBalloonThin } from "react-icons/pi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getQuestionsNumber } from "@/actions/question";
import Image from "next/image";
import { Button } from "../ui/button";
import { EditProfileSchema } from "@/schemas";
import EditProfile from "./edit-profile";

type ProfileDataProps = {
  user: User | null;
};

const ProfileData = ({ user }: ProfileDataProps) => {
  const router = useRouter();
  const [nbQuestions, setNbQuestions] = useState<Number>(0);

  useEffect(() => {
    if (user) {
      getQuestionsNumber(user.id).then((res) => {
        setNbQuestions(res);
      });
    }
  }, [user]);

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
          <div className="text-[14px]">{/*nbQuestions*/} questions</div>
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
        <div className="mt-[60px] p-4 flex flex-col space-y-4">
          <div>
            <div className="text-[20px] font-bold">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-slate-600">@{user?.username}</div>
          </div>
          <div>user Bio</div>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center justify-center">
              <IoLocationOutline className="text-slate-600" />
              <div className="text-slate-600 ml-1">user location</div>
            </div>
            <div className="flex items-center justify-center">
              <PiBalloonThin className="text-slate-600" />
              <div className="text-slate-600 ml-1">user birthday</div>
            </div>
            <div className="flex items-center justify-center">
              <MdOutlineCalendarMonth className="text-slate-600" />
              <div className="text-slate-600 ml-1">user registration date</div>
            </div>
          </div>
          <div className="flex space-x-8">
            <div>number of Following</div>
            <div>number of Followers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
