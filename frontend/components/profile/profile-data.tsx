import React, { useEffect, useState } from "react";
import { User } from "@/types/user";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { getQuestionsNumber } from "@/actions/question";

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
    <div className="border border-red-500 w-full h-full flex flex-col">
      {/* header of profile */}
      <div className="w-full flex p-4">
        {/* Back button */}
        <div onClick={() => router.back()}>
          <IoMdArrowRoundBack className="w-6 h-6 mt-1" />
        </div>
        {/* displayname and number of questions */}
        <div className="flex flex-col ml-[30px]">
          <div className="text-[20px] font-bold">
            {user?.firstName} {user?.lastName}
          </div>
          <div className="text-[14px]">{nbQuestions} questions</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
