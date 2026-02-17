export interface question{
    question:string,
    type:string
}

export interface QuestionResponse {
  message: string,
  data: {
    interviewQuestions: question[];
  },
  status:number
}

export interface saveInterviewResponse{
  message:string,
  data:string,
  status:number
}