export interface responseData{
    jobPosition:string,
    duration:string,
    _id:string,
    userName:string
}

export interface fetchInterviewDataResponse {
message:string,
data:responseData
status:number
}