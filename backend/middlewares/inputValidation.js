import {body} from 'express-validator'

export const signupValidation = [
    body("username")
    .isLength({min:3}).withMessage("username must 3 character long")
    .isString().withMessage("username must be string"),

    body("email")
    .isEmail().withMessage("must be valid email address"),

    body("password")
    .isLength({min:5}).withMessage("password must 5 character long"),

    body("gender")
    .notEmpty().bail().withMessage("gender cannot be empty")  //bail is stop further validation check once first one meet.
    .exists().withMessage("gender field required")
]

export const loginValidation = [
    body("username")
    .notEmpty().withMessage("username field cannot be empty"),

    body("password")
    .notEmpty().withMessage("password field cannot be empty")
]