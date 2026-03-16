export interface LatestInterviewData {
    _id:string,
    jobPosition:string,
    jobDescription:string,
    duration:string,
    createdAt:Date
}
export interface LatestInterviewResponse {
    message:string,
    data:LatestInterviewData[],
    status:number
}