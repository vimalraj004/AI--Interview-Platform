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
    feedback: { type: String, required: true }
}, { timestamps: true });

const Feedback =  models.Feedback || model("Feedback", feedbackSchema);

export default Feedback;