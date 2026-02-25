import { responseData } from "../types/interviewPage";
import React, { createContext, useContext, useState } from "react";

type interviewDataType ={
    interviewData:responseData,
    setInterviewData:React.Dispatch<React.SetStateAction<responseData>>

}

const interviewDataContext = createContext<interviewDataType | null>(null);

export const InterviewDataProvider = ({children}:{children:React.ReactNode})=>{
      const initialInterviewData = {
    // _id: "",
    jobPosition: "",
    duration: "",
    userName: "",
    // interviewTypes:[],
    questionList:[],
  };
  const [interviewData, setInterviewData] =useState<responseData>(initialInterviewData);
    return(
        <interviewDataContext.Provider value={{interviewData,setInterviewData}}>
            {children}
        </interviewDataContext.Provider>

    )
}
export const useInterviewData = ()=>{
   const context =  useContext(interviewDataContext)
   if(!context){
    throw new Error("interviewContext Need to Implement")
   }
   return context;
}