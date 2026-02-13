export interface question{
    question:string,
    type:string
}

export interface QuestionResponse {
  message: string;
  data: {
    interviewQuestions: question[];
  };
}