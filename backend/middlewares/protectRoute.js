import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute = async(req, res, next) => {
    let jwtSecret = process.env.JWTSECRET
    try{
        const token = req.headers?.authorization?.split(" ")[1]
        if(!token){
            return res.status(401).json({status:false, message:"Unauthorized - No Token Provided"})
        };

        const decode = jwt.verify(token , jwtSecret)
        if(!decode){
            return res.status(401).json({status:false, message:"Unauthorized - Token is Invalid"})
        };

        const user = await User.findById(decode.userID).select("-password")
        if(!user){
            return res.status(404).json({status:false, message:"User Not Found"})
        };

        req.user = user
        next()
    }
    catch(error){
        next(error)
    }
};

export default protectRoute;