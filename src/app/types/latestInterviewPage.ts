import { Feedback } from "./scheduledInterviewComponent";

export interface LatestInterviewData {
    _id:string,
    jobPosition:string,
    jobDescription:string,
    duration:string,
    feedback: Feedback;
    createdAt:Date
}
export interface LatestInterviewResponse {
    message:string,
    data:LatestInterviewData[],
    status:number
}