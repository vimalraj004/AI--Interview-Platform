export interface questionListRespone{
    question:string,
    type:string,
    // _id:string
}

export interface responseData{
    jobPosition:string,
    duration:string,
    // _id:string,
    userName:string,
    // interviewTypes:string[],
    questionList:questionListRespone[]
}

export interface fetchInterviewDataResponse {
message:string,
data:responseData
status:number
}

export interface feedbackDatasResponse{
    message:string,
    feedback:String,
    status:number
}