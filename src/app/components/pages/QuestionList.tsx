import { useGlobalStore } from '@/app/Hooks/useGlobalStore'
import { NewFormData } from '@/app/types/newInterivewFormpage'
import { commonService } from '@/lib/utils'
import React, { useEffect } from 'react'

const QuestionList = () => {
    const formData = useGlobalStore()
    console.log(formData,"checkFormdata")
    const getQuestions =async (formData:NewFormData)=>{
      try {
        // const response = commonService()
        
      } catch (error) {
        console.log(error)
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