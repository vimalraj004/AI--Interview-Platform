import { dbConnect } from "@/server/lib/db";
import Feedback from "@/server/models/feedbackModel";
import { questionListService } from "@/server/services/questoinListPage";
import { QuestionInput } from "@/server/types/questionInputs";
import mongoose from "mongoose";

export const resolvers = {
  Query: {
    fetchFeedbackDetails: async (_: any, args: { interviewId: string }) => {
      await dbConnect();
      const feedbackDetails = await Feedback.findOne({
        interviewID: new mongoose.Types.ObjectId(args.interviewId),
      }).select("-__v -updatedAt");
      if (!feedbackDetails) {
        throw new Error("Feedback details not found");
      }
      return feedbackDetails;
    },
  },
    Mutation: {

    getQuestionList: async (
      _: any,
      args:  {
  input: QuestionInput;
}
    ) => {

      const result =
        await questionListService(
          args.input
        );

      return result;
    },
  },
};
