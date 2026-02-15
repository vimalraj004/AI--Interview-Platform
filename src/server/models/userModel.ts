import mongoose, { Mongoose,models,model } from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    confirmPassword:{
        type:String,
    },
    photoURL:{
        type:String,
    },
    googleID:{
        type:String
    }
})
const user = models.users || model("users",userSchema)
export default user;