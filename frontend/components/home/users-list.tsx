"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/actions/user";
import Image from "next/image";
import { useQuery } from "react-query";
import type { User } from "@/types/user";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UsersListProps = {
  users: User[];
};

const UsersList = ({ users }: UsersListProps) => {

  return (
    <>
      {users.length ? (
        <div className="lg:w-[320px] ml-[20px] border rounded-xl bg-slate-100 lg:flex hidden flex-col">
          <h1 className="text-[20px] font-bold p-3">Who to follow</h1>
          <div>
            {users?.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-[10px] hover:bg-slate-200 cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="border border-black">
                    <AvatarImage src={user?.avatar?.path} />
                    <AvatarFallback>
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-bold">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-gray-500">{user.username}</p>
                  </div>
                </div>
                <Button className="text-white rounded-full px-4 py-2">
                  Follow
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default UsersList;
