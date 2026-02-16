export type questionListDatas = {
  question: string;
  type: string;
};
export interface interviewdatas {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  jobType: string[];
    questionList: questionListDatas[];
}
