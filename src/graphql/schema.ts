export const typeDefs = `#graphql

type Rating {
  technicalSkills: Int
  communication: Int
  problemSolving: Int
  experience: Int
}

type Feedback {
  rating: Rating
  summery: String
  Recommendation: String
  RecommendationMsg: String
}

enum Role {
  system
  user
  assistant
}

type ConversationItem {
  role: Role
  content: String
}

type FeedbackDetails {
  interviewID: String
  userName: String
  allConversation: [ConversationItem]
  feedback: Feedback
}

type Query {
  fetchFeedbackDetails(
    interviewId: String!
  ): FeedbackDetails
}

input QuestionInput {
  jobPosition: String!
  jobDescription: String!
  duration: String!
  interviewTypes: [String!]!
}

type Question {
  question: String
  type: String
}

type QuestionResponse {
  interviewQuestions: [Question]
}

type Mutation {
  getQuestionList(
    input: QuestionInput!
  ): QuestionResponse
}
`;