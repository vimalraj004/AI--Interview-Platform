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
