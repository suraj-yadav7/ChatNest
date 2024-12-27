import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute = async(req, res, next) => {
    let jwtSecret = process.env.JWTSECRET
    console.log("rq.header: ", req.headers)
    try{
        const token = req.headers.jwttoken
        if(!token){
            res.status(401).json({status:false, message:"Unauthorized - No Token Provided"})
        }

        const decode = jwt.verify(token , jwtSecret)
        if(!decode){
            res.status(401).json({status:false, message:"Unauthorized - Token is Invalid"})
        }

        const user = await User.findById(decode.userID).select("-password")
        if(!user){
            res.status(404).json({status:false, message:"User Not Found"})
        }
        req.user = user
        next()
    }
    catch(error){
        next(error)
    }
};

export default protectRoute;