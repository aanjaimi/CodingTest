import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { User } from "@/types/user";
import { isFollowing } from "@/actions/friend";
import { useStateContext } from "@/contexts/state-context";
import { follow, unfollow } from "@/actions/follow";

type ProfileDialogProps = {
  user: User | null;
};

const ProfileDialog = ({ user }: ProfileDialogProps) => {
  const { state } = useStateContext();
  const [isFriend, setIsFriend] = useState(false);

  const handleFollow = () => {
    if (!state.user || !user) return;
    follow(state?.user.id, user.id)
      .then((res) => {
        if (res == true) setIsFriend(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = () => {
    if (!state.user || !user) return;
    unfollow(state?.user.id, user.id)
      .then((res) => {
        if (res == true) setIsFriend(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user && state.user) {
      isFollowing(state?.user.id, user.id)
        .then((res) => {
          if (res.length > 0) setIsFriend(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, state.user]);

  return (
    <div className="flex">
      <Button variant="outline" className="rounded-full font-bold">
        {isFriend ? (
          <span onClick={handleUnfollow}>Unfollow</span>
        ) : (
          <span onClick={handleFollow}>Follow</span>
        )}
      </Button>
    </div>
  );
};

export default ProfileDialog;
