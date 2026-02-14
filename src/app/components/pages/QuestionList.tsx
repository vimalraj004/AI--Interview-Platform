import { useLoading } from '@/app/context/loadingContext'
import { useGlobalStore } from '@/app/Hooks/useGlobalStore'
import { FormDataDTOResponse, NewFormData } from '@/app/types/newInterivewFormpage'
import { question,QuestionResponse } from '@/app/types/questionListPage'
import { commonService } from '@/lib/utils'
import { Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { Button } from '../ui/button'

const QuestionList = () => {
    const formData = useGlobalStore();
    const { jobPosition, jobDescription, duration, interviewTypes } = formData;
   const {loading,setLoading}= useLoading()
   const [questionList,setQuestionList]=useState<question[]>([])
    const getQuestions =async (formData:NewFormData) :Promise<void>=>{
      try {
        setLoading(true)
        const result = await commonService<QuestionResponse>("/api/getQuestionList","POST",formData)
        console.log(result,"resultfromfe")
  setQuestionList(result?.data?.interviewQuestions);
       toast.success(result.message)
      } catch (error:any) {
        toast.error(error.message)
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      if(jobPosition && jobDescription && duration && interviewTypes){
        getQuestions(formData)
      }
    },[jobPosition, jobDescription, duration, interviewTypes])
  return (
    <div>
      {loading && 
      <div className='p-5 bg-blue-100 border border-gray-100 flex items-center gap-5 rounded-xl'>
        <Loader2Icon className='animate-spin' />
        <div>
        <h2 className='font-medium'>Generating Interview Questions</h2>
        <p className='text-primary'>Our AI is crafting personalized questions based on your job position</p>
        </div>

      </div>
      
        }
        {questionList.length >0 &&
        <div>
            <h2 className='font-bold text-lg mb-5'>Generate Interview Questoins:</h2>
            <div className=' p-5 border border-gray-50 rounded-xl bg-white'>
          {questionList.map((item,index)=>{
            return(
              <div key={index} className='p-3 border border-gray-300 mb-2 rounded-lg'>
                  <h2 className='font-medium'>{item.question}</h2>
                  <h2 className='text-primary'>Type: {item.type}</h2>
              </div>
            )
          })}
          <div className=' flex justify-end ju items-end mt-10 '>
          <Button>Finish</Button>
        </div>
        </div>
        </div>

        }


    </div>
  )
}

export default QuestionList