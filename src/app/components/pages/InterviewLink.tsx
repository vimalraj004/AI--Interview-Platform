"use client"
import { useGlobalStore } from '@/app/Hooks/useGlobalStore';
import Image from 'next/image';
import React from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Briefcase, Clock, Copy, List } from 'lucide-react';

interface InterviewLinkProps{
    interviewLinkId:string
}
const InterviewLink = ({interviewLinkId}:InterviewLinkProps) => {
      const formData = useGlobalStore();
      const { jobPosition, jobDescription, duration, interviewTypes } = formData;
      console.log(jobPosition, jobDescription, duration, interviewTypes,"check these data")
  return (
    <div className='border border-red-500'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <Image src={"/5610944.png"} alt='tickicon' width={30} height={30} />
        <h2 className='font-bold text-white'>Your AI Interview is Ready!</h2>
        <p className='text-white'>Share this link with your candidates to start the interview process</p>
      </div>
      <div className='bg-white p-5 rounded-xl mt-2'>
        <div className='flex justify-between'>
          <h2 className='font-bold'>InterviewLink</h2>
          <p className='rounded-xl text-primary bg-blue-200 text-sm p-1 px-2'>Valid for 30 Days</p>
        </div>
        <div className='flex gap-2 mt-4'>
          <Input defaultValue={process.env.NEXT_PUBLIC_BASE_URL+"/"+"interview"+"/"+interviewLinkId} disabled={true} />
          <Button><Copy />Copy Link</Button>
        </div>
        <div className='flex justify-evenly mt-5'>
          <h2 className='text-sm text-gray-7  00 flex gap-2 items-center'><Clock className='h-4 w-4'/>{duration}</h2>
          <h2 className='text-sm text-gray-7  00 flex gap-2 items-center'><List className='h-4 w-4'/>{interviewTypes}</h2>
          <h2 className='text-sm text-gray-7  00 flex gap-2 items-center'><Briefcase className='h-4 w-4'/>{jobPosition}</h2>
        </div>

      </div>
      
    </div>
  )
}

export default InterviewLink