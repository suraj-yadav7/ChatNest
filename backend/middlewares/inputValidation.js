import { body, validationResult } from 'express-validator';

export const signupValidation = ()=>{
    return [
    body("fullname")
    .isLength({min:5}).withMessage("fullname must 3 character long")
    .isString().withMessage("fullname must be string"),

    body("username")
    .isLength({min:3}).withMessage("username must 3 character long")
    .isString().withMessage("username must be string"),

    body("email")
    .isEmail().withMessage("must be valid email address"),

    body("password")
    .isLength({min:5}).withMessage("password must 5 character long"),

    body("confirmPassword")
    .isLength({min:5}).withMessage("confirmPassword must 5 character long"),

    body("gender")
    .notEmpty().bail().withMessage("gender cannot be empty")  //bail is stop further validation check once first one meet.
    .exists().withMessage("gender field required"),
    (req, res, next)=>{
        console.log("validation: ", req.body)
        const allowedFields = ["fullname","username", "email", "password", "confirmPassword","gender"]
        const extraFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field))
        if(extraFields.length >=1){
            return res.status(200).json({status:false, message:` Extra fields found in req.body: ${extraFields.join(", ")}`})
        };

        const errors  = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false, message:"Invalid input payload", error:errors.array()})
        };

        next()
    }
]
}

export const loginValidation = ()=>{
    return [
    body("username")
    .notEmpty().withMessage("username field cannot be empty"),

    body("password")
    .notEmpty().withMessage("password field cannot be empty"),
    (req, res, next)=>{
        const allowedFields = ["username", "password"]
        const extraFields = allowedFields.filter((field) => !allowedFields.includes(field))
        if(extraFields.length >=1){
            return res.status(200).json({status:false, message:` Extra fields found in req.body: ${extraFields.join(", ")}`})
        };

        const errors  = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({status:false, message:"Invalid input payload", error:errors.array()})
        };

        next()
    }
    ]
}