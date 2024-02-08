import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDemo = () => {
  return (
    <div className="w-[50%] h-[200px] flex items-start space-x-4 bg-white border border-black">
      <Skeleton className="ml-[10px] mt-[10px] h-10 w-10 rounded-full" />
      <div className="mt-[10px] flex flex-col w-full space-y-6">
        <Skeleton className="h-4 w-[500px]" />
        <Skeleton className="h-10 w-[500px] rounded-xl" />
      </div>
    </div>
  );
};

export default SkeletonDemo;
