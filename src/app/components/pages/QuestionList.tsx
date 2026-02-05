import { useGlobalStore } from '@/app/Hooks/useGlobalStore'
import React from 'react'

const QuestionList = () => {
    const formData = useGlobalStore()
    console.log(formData,"checkFormdata")
  return (
    <div>QuestionList</div>
  )
}

export default QuestionList