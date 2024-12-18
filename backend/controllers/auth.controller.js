import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import generateToken from "../utils/generateTokenAndCookies.js";

// User Signup
export const signup = async(req, res)=>{
    try{
        const errors = validationResult(req)
        let specificError
        if(!errors.isEmpty()){
            specificError = errors.array().filter(error =>{
                return error.msg
            })
            return res.status(400).json({status:false, error:specificError});
        }
        const {fullname, email, username, password, confirmPassword, gender} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({message:"password don't match"})
        }
        // Existing user check
        const userCheck = await User.findOne({username})
        if(userCheck){
            return res.status(400).json({message:"User already exist"})
        }

        // Password Hashing
        const salt         = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        // Profile avatar creation
        const profileAvatarBoy  =  await `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const profileAvatarGirl =  await `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // User creation
        const user = new User({
            fullname : fullname,
            username : username,
            gender   : gender,
            email    : email,
            password : hashPassword,
            profile  : gender === "male"?profileAvatarBoy:profileAvatarGirl
        })
        const userCreated = await user.save()
        const data = {
            name     : userCreated.fullname,
            username : userCreated.username,
            email    : userCreated.email,
            gender   : userCreated.gender
        }
        return res.status(201).json({status:true, message:"User created successfully",
            data:data})
    }
    catch(error){
        console.log("Error occured at signup: ", error)
        return res.status(500).json({status:false, message:"Internal Sever Error"})
    }
};

// User Login
export const login = async(req, res)=>{
    try{
        const errors = validationResult(req)
        let specificError
        if(!errors.isEmpty()){
            specificError = errors.array().filter(error =>{
                return  error.msg
            })
            return res.status(400).json({status:false, error:specificError})
        }

        const {username, password} = req.body
        const userExist = await User.findOne({username});
        if(!userExist){
            return res.status(400).json({status:false, message:"User don't exist, Signup"})
        }

        const passwordCheck = await bcryptjs.compare(password, userExist.password)
        if(!passwordCheck){
            return res.status(400).json({status:false, message:"Password is incorrect"})
        }
        let userId    = userExist._id.valueOf()
        let jwtToken  = generateToken(userId, res);
        return res.status(200).json({status:true, message:"User Successfully Logged", jwtToken : jwtToken, userID:userExist._id.valueOf()})

    }
    catch(error){
        console.log("Error occured at Login: ", error)
        return res.status(500).json({status:false, message:"Internal Server Error"})
    }
};

// User logout
export const logout = async(req, res)=>{
    try{
        return res.status(200).json({status:true, message:"User successfully logged out", jwtToken : ""})
    }
    catch(error){
        console.log("Error occured at logout: ", error)
        return res.status(500).json({status:false, message:"Internal Server Error", })
    }
};

// User password forget
export const forgetPassword = async(req, res)=>{
    try{
        const {email}   = req.body
        //Existing user check
        const userCheck = await User.findOne({email})
        if(!userCheck){
            return res.status(400).json({status:false, message:"Provide correct email address"})
        }
            return res.status(200).json({status:true, nessage:"User Found Successfully", data:{username:userCheck.username}})
    }
    catch(error){
        console.log("Error occured at forget password: ", error)
        return res.status(500).json({status:false, message:"Internal server error"})
    }
};

// User password update
export const updatePassword = async(req, res)=>{
    try{
        const {username, password, confirmPassword} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({message:"password don't match"})
        }
        // Existing user check
        const userExist = await User.findOne({username})
        if(!userExist){
            return res.status(400).json({message:"User already exist"})
        }
        // Password Hashing
        const salt          = await bcryptjs.genSalt(10)
        const hashPassword  = await bcryptjs.hash(password, salt)
        const passUpdate    = await User.findByIdAndUpdate(userExist._id,{password:hashPassword})
        if(passUpdate){
            return res.status(201).json({status:true, message:"Password Updated Successfully", data:{data:passUpdate}})
        }
    }
    catch(error){
        console.log("Error occured at update password: ", error)
        return res.status(500).json({status:false, message:"Internal Server Error"});
    }
};