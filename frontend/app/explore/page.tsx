'use client';
import PageStructure from '@/components/home/page-structure';
import SearchBar from '@/components/home/search-bar';
import React from 'react'

const Explore = () => {

  const component = () => {
    return (
      <div className='w-full h-full flex flex-col items-center justify-start'>
        <SearchBar width='w-[90%]' height='h-[40px]' position='pl-[5%]' />
      </div>
    )
  }

  return (
    <PageStructure component={component} />
  )
}

export default Explore;
