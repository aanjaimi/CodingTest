'use client'
import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { fetcher } from "@/lib/utils";
import { Notification } from "@/types/notifications";
import { useStateContext } from "@/contexts/state-context";
import DisplayNotification from "./display-notification";

export const getNotifications = async (
  id: string | undefined,
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
) => {
  const response = await fetcher(`/notifications/${id}`);
  setNotifications(response.data);
};

const NotificationsList = () => {
  const { state } = useStateContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    getNotifications(state?.user?.id, setNotifications);
  }, [state.user]);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[70px] w-full p-3 font-bold text-xl border border-b-slate-500">Notifications</div>
      <ScrollArea>
        {notifications.map((notification) => (
          <DisplayNotification key={notification.id} notification={notification} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default NotificationsList;
