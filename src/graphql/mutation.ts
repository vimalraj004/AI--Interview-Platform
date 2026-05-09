import { gql } from "@apollo/client";

export const GET_QUESTION_LIST =
  gql`

    mutation MyQuestionList(
      $input: QuestionInput!
    ) {

      getQuestionList(
        input: $input
      ) {

        interviewQuestions {
          question
          type
        }
      }
    }
  `;