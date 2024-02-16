import PageStructure from '@/components/home/page-structure'
import ProfileData from '@/components/profile/profile-data'
import { useStateContext } from '@/contexts/state-context'
import React from 'react'

const Profile = () => {
  const { state } = useStateContext()
  const { user } = state;
  return (
    <div className='w-screen h-screen flex'>
      <PageStructure component={ProfileData} componentProps={user}/>
    </div>
  )
}

export default Profile
