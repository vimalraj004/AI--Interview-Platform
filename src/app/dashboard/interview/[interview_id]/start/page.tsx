import { useInterviewData } from '@/app/context/interviewDataContext'
import React from 'react'

const startInterview = () => {
  const{interviewData,setInterviewData}= useInterviewData();
  return (
    <div>startInterview</div>
  )
}

export default startInterview