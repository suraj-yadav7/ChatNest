import Conversation from "../models/conversation.model.js";
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

export const getUserFriends = async(req, res, next) => {
    try{
        const { _id } = req.user
        const frndConv = await Conversation.find({participants: {$in : [_id]}})
        const friends = await Promise.all( frndConv.map(async(conv) =>{
            const friendId = conv.participants.find(participants => participants.toString() !== _id.toString())
            const friend = await User.findById(friendId).select("-password")
            return friend
        }));
        return res.status(200).json({status:true, message:"User friends found.", data:friends});
    }
    catch(error){
        next(error)
    }
};