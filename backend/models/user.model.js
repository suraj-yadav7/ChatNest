import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enums:["male", "female"]
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        defaulr:""
    }
},{timestamp:true})

const User = mongoose.model("user", userSchema)

export default User;