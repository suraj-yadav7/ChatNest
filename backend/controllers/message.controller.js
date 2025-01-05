import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"

export const sendMessage = async(req, res, next)=>{
    try{
        const {messages} = req.body
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
            messages
        });

        if(newMessage){
            conversation.messages.push(newMessage)
        }

        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json({statu:true, message:"Message successfully created", data:{newMessage}});
    }
    catch(error){
        next(error)
    }
};

export const getMessage = async(req, res, next)=>{
    try {
        const {id} = req.params
        const senderId = req.user._id
        const conversation = await Conversation.findOne({
            participants :{ $all : [senderId, id]}}).populate("messages")

            if(!conversation){
                return res.status(200).json({status:true, message:"No conversation happen.",data:[]})
            }
        return res.status(200).json({status:true, message:"successfully fetched message", data:conversation.messages})
    } catch (error) {
        next(error)
    }
};

