import React from "react";
import { Notification } from "@/types/notifications";
import { PiStarFourFill } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type DisplayNotificationProps = {
  notification: Notification;
};

const DisplayNotification = ({ notification }: DisplayNotificationProps) => {
  return (
    <div className="w-full h-full flex border border-slate-100 hover:bg-slate-200">
      <div className="pt-3 pl-6">
        <PiStarFourFill className="w-8 h-8" />
      </div>
      <div className="flex flex-col py-2 pl-2 space-y-2">
        <Avatar>
          <AvatarImage src={notification.sender?.avatar.path} />
          <AvatarFallback>
            {notification.sender?.firstName[0]}
            {notification.sender?.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="font-bold">
          {notification.sender?.firstName} {notification.sender?.lastName}
        </div>
        <div className="text-slate-300">
          {notification.content.message}
        </div>
      </div>
    </div>
  );
};

export default DisplayNotification;
