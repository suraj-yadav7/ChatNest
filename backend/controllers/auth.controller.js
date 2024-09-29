import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { validationResult } from "express-validator"

export const signup = async(req, res)=>{
    try{
        const errors = validationResult(req)
        let specificError
        if(!errors.isEmpty()){
            specificError = errors.array().filter(error =>{
                return req.body.hasOwnProperty(error.param)
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
        const user = await new User({
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
        return res.status(201).json({message:"User created successfully",
            data:data})
    }
    catch(error){
        console.log("Error occured at signup: ", error)
        return res.status(500).json({status:false, message:"Internal Sever Error"})
    }
}

export const login = async(req, res)=>{
    try{
        if(req.body.val === "check"){
            throw new Error("error")
        }
        if(req.body.val === "pass"){
            console.log("login auth")
            res.status(200).json({status:true, message:"response successfull"})
        }
    }
    catch(error){
        res.status(500).json({status:false, message:"Internal server error"})
    }
}

export const logout = async(req, res)=>{
    try{

    }
    catch(error){

    }
}