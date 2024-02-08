"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { BsFillEnvelopePlusFill } from "react-icons/bs";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";

const MessagesDrawer = () => {
  return (
    <div className="ml-[20px] lg:w-[320px] lg:h-[50px] lg:flex hidden items-center justify-between border rounded-t-2xl">
      <span className="text-[] font-bold ml-[10px]">Messages</span>
      <div className="flex mr-[10px] space-x-4">
        <span>
          <BsFillEnvelopePlusFill className="w-6 h-6" />
        </span>
        <Drawer>
          <DrawerTrigger className="w-8 h-8 flex items-center justify-center border rounded-full bg-white focus:bg-slate-200">
            <FaAnglesUp className="w-6 h-6" />
          </DrawerTrigger>
          <div className="flex items-end justify-end">
            <DrawerContent className="mr-[20px] lg:w-[320px] flex">
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default MessagesDrawer;
