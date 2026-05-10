"use client"
 import React from 'react'
import { useParams } from 'next/navigation';
import WelcomeContainer from '@/app/components/pages/WelcomeContainer';
import FeedbackDetails from '@/app/components/pages/FeedbackDetails';

const FeedbackPage = () => {
    const { interview_id } = useParams();
   return (
      <div className='min-h-screen w-full pt-5 pr-5 '> 
      <WelcomeContainer />
      <h2 className='font-semibold font-mono text-2xl pl-1 text-white mt-2'>FeedBack Details</h2>
      <FeedbackDetails  interview_id={interview_id as string}/>
      </div>
  )
}

export default FeedbackPage