// export interface Feedback {
//   // feedback: {
//     rating: {
//       technicalSkills: number;
//       communication: number;
//       problemSolving: number;
//       experience: number;
//     };
//     summery: string; 
//     Recommendation: string;
//     RecommendationMsg: string;
//   // };
// }
// export type conversationItem = {
//     role:"system" | "user" | "assistant",
//     content:string
// };
// export interface feedbackDetailsResponse {
//   status: number;
//   message: string;
//   feedbackDetails: {
//     interviewID: string;
//     userName: string;
//     allConversation: conversationItem[];
//     feedback: Feedback;
//   };
// }

export type conversationItem = {
  role:
    | "system"
    | "user"
    | "assistant";

  content: string;
};
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

export interface FeedbackDetailsState {

  interviewID: string;

  userName: string;

  allConversation: conversationItem[];

  feedback: Feedback;
}
export interface FetchFeedbackDetailsResponse {

  fetchFeedbackDetails:
    FeedbackDetailsState;

}