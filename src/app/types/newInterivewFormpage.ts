export interface NewFormData{
    jobPosition:string,
    jobDescription:string,
    duration:string,
    interviewTypes:Array<string>
}

export type NewFormDataEvent = string | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>


export interface FormDataDTOResponse{
    message:string,
    data:object,
    status:number
}

