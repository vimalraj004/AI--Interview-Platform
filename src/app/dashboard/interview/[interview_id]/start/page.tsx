"use client"
import WelcomeContainer from '@/app/components/pages/WelcomeContainer';
import { useInterviewData } from '@/app/context/interviewDataContext'
import { Timer } from 'lucide-react';
import React from 'react'

const startInterview = () => {
  const{interviewData,setInterviewData}= useInterviewData();
  console.log(interviewData,"interviewDatain start page")
  return (
    <div className='min-h-screen w-full pr-5'>
      <div className='mt-5'>
        <WelcomeContainer />
      </div>
      <div className='flex justify-between p-24 border'>
        <h2 className='text-white'>AI Interview Session</h2>
        <span className='text-white flex'>
          <Timer className='text-white' />
          00:00:00
        </span>
      </div>
      <div className='grid grid-cols-1 border border-red-500 gap-4'>
        <div className='bg-white h-10 '></div> 
        <div className='bg-white h-10 '></div>
      </div>
    </div>
  )
}

export default startInterview