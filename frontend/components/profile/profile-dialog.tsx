import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { User } from "@/types/user";

type ProfileDialogProps = {
  user: User;
};

const ProfileDialog = ({ user }: ProfileDialogProps) => {
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    // Check if the user is a friend
    setIsFriend(true);
  
  }
  , []);

  return (
    <div className="flex">
      <Button variant="outline" className="rounded-full font-bold">Follow</Button>
    </div>
  );
};

export default ProfileDialog;
