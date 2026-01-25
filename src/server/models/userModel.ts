import mongoose, { Mongoose,models,model } from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})
const user = models.users || model("users",userSchema)
export default user;