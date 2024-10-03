import jwt from "jsonwebtoken"

const generateToken = (userID, res) => {
    const jwtSecret  = process.env.JWTSECRET
    const token      = jwt.sign({userID}, jwtSecret, {
        expiresIn:"3d"
    })
    res.cookie("jwt", token, {
        maxAge   : 3 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : "strict",
        secure   : process.env.NODE_MODE !== "local"
    })
    return token
};

export default generateToken;