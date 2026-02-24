import mongoose, { model, models } from "mongoose";

const interviewSchema = new mongoose.Schema({
      jobPosition:{
        type:String,
        required:true
      },
      jobDescription: {
        type:String,
        required:true
      },
      duration: {
        type:String,
        required:true
      },
      interviewTypes: {
        type:[String],
        required:true
      },
  
},
    {timestamps:true,
      id:false
    })
interviewSchema.virtual("questionList",{
    ref:"Questions",
    localField:"_id",
    foreignField:"interviewID"
})

interviewSchema.set("toObject",{virtuals:true})
interviewSchema.set("toJSON",{virtuals:true})

 const InterviewData =  models.InterviewData || model("InterviewData",interviewSchema)
 export default InterviewData;