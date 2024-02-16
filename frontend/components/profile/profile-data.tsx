import React from "react";
import { User } from "@/types/user";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";

type ProfileDataProps = {
  user: User | undefined;
};

const ProfileData = ({ user }: ProfileDataProps) => {
  const router = useRouter();
  if (user === undefined) return null;
  return (
    <div className="w-full h-full flex flex-col">
      {/* header of profile */}
      <div className="w-full h-[60px] flex">
        {/* Back button */}
        <div onClick={() => router.back()}>
          <IoMdArrowRoundBack />
        </div>
        {/* displayname and number of posts */}
        <div className="flex flex-col">
          {} {}
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
