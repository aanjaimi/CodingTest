"use client";
import { getUsers } from "@/actions/user";
import { User } from "@/types/user";
import React, { useEffect, useState, PropsWithChildren } from "react";
import RightSideBar from "./right-sidebar";
import LeftSideBar from "./left-sidebar";

type PageStructureProps = {
  component: React.ComponentType<any>;
  componentProps?: any;
};

const PageStructure: React.FC<PageStructureProps> = ({
  component: Component,
  componentProps,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-row items-center justify-center overflow-hidden">
      <div className="h-full flex-1 sm:w-[300px]">
        <RightSideBar />
      </div>
      <div className="w-[600px] h-full border border-slate-100">
        <Component {...componentProps}/>
      </div>
      <div className="h-full flex-1 md:flex hidden">
        <LeftSideBar users={users} />
      </div>
    </div>
  );
};

export default PageStructure;
