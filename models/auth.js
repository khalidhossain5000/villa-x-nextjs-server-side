import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
    fullName:{
        type:String,
        required:true,
        minlength:5,
        maxlength:25  
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    userRole:{
        type:String,
           enum: ["admin", "host", "guest"],
        default:'guest'
    },

}, { timestamps: true })


const User=mongoose.model('User',userSchema)

export default User;