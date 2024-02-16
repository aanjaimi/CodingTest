import React from "react";
import SearchBar from "./search-bar";
import MessagesDrawer from "./messages-drawer";
import UsersList from "./users-list";
import type { User } from "@/types/user";

type LeftSideProps = {
  users: User[];
};

const LeftSideBar = ({ users }: LeftSideProps) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between">
      <SearchBar width="lg:w-[320px]" height="lg:h-[40px]" />
      <UsersList users={users} />
      <MessagesDrawer />
    </div>
  );
};

export default LeftSideBar;
