import { findFileType } from "../constants/helperFunctions";
import { resumeController } from "../controllers/resumeController";

export const uploadResumeService = async(resumeFile:File,jobDescription:string)=>{
    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const fileType = resumeFile.type;
    const extractedText = "";
    // fine the file Type
  const extractedFileString =   await findFileType(fileType,buffer,extractedText)
    // Here you can implement the logic to analyze the resume text against the job description
    return resumeController(extractedFileString,jobDescription)
}