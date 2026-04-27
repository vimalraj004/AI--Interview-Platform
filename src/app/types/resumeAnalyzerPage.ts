export interface ResumeAnalysisResponse {
    message: string;
    status:Number;
    data:{
score: number;
  missingSkills: string[];
  suggestions: string[];
    }

}