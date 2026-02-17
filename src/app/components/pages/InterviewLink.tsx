import { useGlobalStore } from '@/app/Hooks/useGlobalStore';
import React from 'react'

interface InterviewLinkProps{
    interviewLinkId:string
}
const InterviewLink = ({interviewLinkId}:InterviewLinkProps) => {
      const formData = useGlobalStore();
      const { jobPosition, jobDescription, duration, interviewTypes } = formData;
      console.log(jobPosition, jobDescription, duration, interviewTypes,"check these data")
  return (
    <div>InterviewLink{interviewLinkId}</div>
  )
}

export default InterviewLink