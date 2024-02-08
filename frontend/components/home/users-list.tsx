"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/actions/getUser";
import Image from "next/image";
import { useQuery } from "react-query";
import { User } from "@/types/user";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UsersList = () => {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    getUsers().then((data) => {
      console.log('data: ', data);
      setUsers(data);
    });
  }, [users]);

  console.log('users: ', users);

  return (
    <div className="lg:w-[320px] ml-[20px] border rounded-full bg-slate-200 flex flex-col">
      <h1 className="text-[20px] ml-[10px] font-bold">Who to follow</h1>
      {users.length ? (
        <div>
          {users?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-[10px]"
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
              <Button className="bg-blue-500 text-white rounded-full px-4 py-2">
                Follow
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UsersList;
