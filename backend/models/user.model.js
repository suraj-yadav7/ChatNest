import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type : String,
        required:true
    },
    username:{
        type : String,
        unique:true,
        required:true
    },
    gender:{
        type:String,
        enums:["male", "female"],
        required:true
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
},{timestamps:true})

const User = mongoose.model("user", userSchema)

export default User;