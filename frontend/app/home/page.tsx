import LeftSideBar from '@/components/home/left-sidebar'
import QuestionsList from '@/components/home/question-list'
import RightSideBar from '@/components/home/right-sidebar'
import React from 'react'

const HomePage = () => {
  return (
    <div className='w-screen h-screen flex flex-row items-center justify-center'>
      <div className="h-full flex-1 sm:w-[300px]">
        <RightSideBar />
      </div>
      <div className="w-[600px] h-full border border-slate-100">
        <QuestionsList />
      </div>
      <div className="h-full flex-1 md:flex hidden">
        <LeftSideBar />
      </div>
    </div>
  )
}

export default HomePage
