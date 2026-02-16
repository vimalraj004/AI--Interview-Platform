import mongoose, { model, models } from "mongoose";

const questionSchema = new mongoose.Schema({
    interviewID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"InterviewData",
        required:true
    },
    question:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }
},
{timestamps:true}
)
const   Questions = models.Questions || model("Questions",questionSchema)
export default Questions;