import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"

export const sendMessage = async(req, res)=>{
    try{
        const {message} = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants:{$all :[senderId, receiverId]}
        })
        if(!conversation){
            conversation = new Conversation({
                participants:[senderId, receiverId]
            })
        }

        const newMessage =  new Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage)
        }
        await conversation.save();
        await newMessage.save();
        res.status(201).json({statu:true, message:"Message successfully created", data:{newMessage}});
    }
    catch(error){
        console.log("Error occured at send message: ", error)
        res.status(500).json({status:true, message:"Internal Server Error"})
    }
};

