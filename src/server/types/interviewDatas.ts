export type questionListDatas = {
  question: string;
  type: string;
};
export interface interviewdatas {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  interviewTypes: string[];
    questionList: questionListDatas[];
}

export type conversationItem = {
    role:"system" | "user" | "assistant",
    content:string
};
export interface feedbackDatas{
  interviewID:string;
  userName:string;
  allConversation:conversationItem[]
} 