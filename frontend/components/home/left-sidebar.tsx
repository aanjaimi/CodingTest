import React from "react";
import SearchBar from "./search-bar";
import MessagesDrawer from "./messages-drawer";
import UsersList from "./users-list";

const LeftSideBar = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-between">
      <SearchBar />
      <UsersList />
      <MessagesDrawer />
    </div>
  );
};

export default LeftSideBar;
