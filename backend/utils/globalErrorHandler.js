export const globalErrorHandler = async(err, req, res, next)=>{
    const {method, url}  = req
    console.log(`Error while ${method} method for url : ${url}, Message: ${err.stack}`)
    return res.status(500).json({status:false,  message:"Internal Server Errorssss"})
};