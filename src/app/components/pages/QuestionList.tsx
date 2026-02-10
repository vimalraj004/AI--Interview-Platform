import { useLoading } from '@/app/context/loadingContext'
import { useGlobalStore } from '@/app/Hooks/useGlobalStore'
import { NewFormData } from '@/app/types/newInterivewFormpage'
import { commonService } from '@/lib/utils'
import React, { useEffect } from 'react'

const QuestionList = () => {
    const formData = useGlobalStore()
   const {loading,setLoading}= useLoading()
   console.log(loading,"loading")
    console.log(formData,"checkFormdata")
    const getQuestions =async (formData:NewFormData)=>{
      try {
        setLoading(true)
        const result = commonService("/api/getQuestionList","GET",formData)
        
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
getQuestions(formData)
    },[formData])
  return (
    <div>QuestionList</div>
  )
}

export default QuestionList