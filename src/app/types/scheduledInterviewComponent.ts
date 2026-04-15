export interface Feedback {
  rating: {
    technicalSkills: number;
    communication: number;
    problemSolving: number;
    experience: number;
  };
  summery: string; 
  Recommendation: string;
  RecommendationMsg: string;
}