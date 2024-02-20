import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import ProfileForm from "./profile-form";
import { Button } from "../ui/button";

const EditProfile = () => {
  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline" className="rounded-full font-bold">Edit profile</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="font-bold text-[20px]">Edit profile</DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
