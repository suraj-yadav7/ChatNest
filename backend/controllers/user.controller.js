import User from "../models/user.model"

export const getUserForSidebar = async(req, res)=>{
    try{
        const loggedInUserId = req.user._id
        const filterUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        return res.status(200).json({status:true, message:"User is logged", data:filterUser})
    }
    catch(error){
        console.log("Error occur while getting user: ", error)
        return res.status(500).json({status:false, message:"Internal server error"})
    }
};