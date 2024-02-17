"use client";
import React, { useEffect, useState } from "react";
import PageStructure from "@/components/home/page-structure";
import ProfileData from "@/components/profile/profile-data";
import { getUserById } from "@/actions/user";
import { User } from "@/types/user";

const Profile = ({ params }: { params: { username: string } }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUserById(params.username)
    .then((res) => {
      setUser(res);
    })
    .catch(() => setUser(null));
  }, [params.username]);

  return (
    <div className="w-screen h-screen flex">
      <PageStructure component={ProfileData} componentProps={{ user }} />
    </div>
  );
};

export default Profile;
