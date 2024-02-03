import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonDemo = () => {
  return (
    <div className="w-[50%] h-[150px] flex items-start space-x-4 mt-[10px] ml-[10px]">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col w-full space-y-8">
        <Skeleton className="h-4 w-[250px]" />
        <div className="flex items-stretch justify-center">
          <Skeleton className="h-[80px] w-[600px] rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDemo;
