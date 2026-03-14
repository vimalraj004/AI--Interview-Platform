import mongoose, { models,model } from "mongoose";

const feedbackSchema = new mongoose.Schema({
    interviewID: { type: String, required: true },
    userName: { type: String, required: true },
    allConversation: [
        {
            role: { type: String, enum: ["system", "user", "assistant"], required: true },
            content: { type: String, required: true }
        }
    ],
    feedback: {
        rating: {
            technicalSkills: { type: Number, required: true },
            communication: { type: Number, required: true },
            problemSolving: { type: Number, required: true },
            experience: { type: Number, required: true }
        },
        summery: { type: String, required: true },
        Recommendation: { type: String, required: true },
        RecommendationMsg: { type: String, required: true }
    }
}, { timestamps: true });

const Feedback =  models.Feedback || model("Feedback", feedbackSchema);

export default Feedback;