import React from 'react'
import WelcomeContainer from '../components/pages/WelcomeContainer'
import LatestInterviewList from '../components/pages/LatestInterviewList'

const AllInterviewsPage = () => {
  return (
    <div className='

     min-h-screen w-full pt-5 pr-5 '> 
      <WelcomeContainer />
      <h2 className='font-semibold font-mono text-2xl pl-1 text-white mt-2'>All Interviews</h2>
      <LatestInterviewList allInterviews={true} />
      </div>
  )
}

export default AllInterviewsPage