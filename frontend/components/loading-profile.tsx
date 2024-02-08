import React from 'react'
import SkeletonDemo from './home/skeleton-demo';

const LoadingProfile = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <SkeletonDemo />
      <SkeletonDemo />
      <SkeletonDemo />
      <SkeletonDemo />
      <SkeletonDemo />
      <SkeletonDemo />
    </div>
  )
}

export default LoadingProfile;
