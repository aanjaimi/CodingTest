import React from 'react'
import SideBarIcons from './sidebar-icons'
import ProfileLink from './profile-link'

const RightSideBar = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-end'>
      <SideBarIcons />
      <ProfileLink />
    </div>
  )
}

export default RightSideBar
