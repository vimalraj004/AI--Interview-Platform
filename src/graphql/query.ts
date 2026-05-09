import { gql } from "@apollo/client";

// here we are defining the GraphQL query to fetch feedback details for a specific interview. The query takes an interviewId as a variable and retrieves the interviewID, userName, allConversation (which includes role and content), and feedback (which includes summery, Recommendation, RecommendationMsg, and rating details).
// and 1st part is just a query label name (MyFeedbackQuery) and the 2nd part is the actual query with variables ($interviewId: string!) and the fields we want to retrieve from the server(resolver).
export const FETCH_FEEDBACK_DETAILS = gql`
  query MyFeedbackQuery($interviewId: String!) {
    fetchFeedbackDetails(interviewId: $interviewId) {
      interviewID
      userName
      allConversation {
        role
        content
      }
      feedback {
        summery
        Recommendation
        RecommendationMsg

        rating {
          technicalSkills
          communication
          problemSolving
          experience
        }
      }
    }
  }
`;
