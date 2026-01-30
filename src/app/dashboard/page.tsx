
import WelcomeContainer from '@/app/components/pages/WelcomeContainer'
import React from 'react'
import CreateOptions from '../components/pages/CreateOptions'
import LatestInterviewList from '../components/pages/LatestInterviewList'

const dasboard = () => {
  return (
    <div className='

     min-h-screen w-full pt-5 pr-5 '> 
      <WelcomeContainer />
      <h2 className='font-semibold font-mono text-2xl pl-1 text-white mt-2'>Dashboard</h2>
      <CreateOptions />
      <h2 className='font-semibold font-mono text-2xl pl-1 text-white mt-2'>Previously Created Interviews</h2>
      <LatestInterviewList />
      </div>
  )
}

export default dasboard