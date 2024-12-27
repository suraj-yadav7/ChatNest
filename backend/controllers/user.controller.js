import User from "../models/user.model.js"

export const getUserForSidebar = async(req, res, next)=>{
    try{
        const loggedInUserId = req.user._id
        const filterUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json({status:true, message:"User is logged", data:filterUser})
    }
    catch(error){
        next(error)
    }
};