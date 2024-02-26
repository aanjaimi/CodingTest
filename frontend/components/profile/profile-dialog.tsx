import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import { isFollowing } from "@/actions/friend";

type ProfileDialogProps = {
  user: User | null;
};

const ProfileDialog = ({ user }: ProfileDialogProps) => {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (user) {
      isFollowing(user.id)
        .then((res) => {
          if (res) setIsFriend(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div className="flex">
      <Button variant="outline" className="rounded-full font-bold">
        {isFriend ? <>Unfollow</> : <>Follow</>}
      </Button>
    </div>
  );
};

export default ProfileDialog;
