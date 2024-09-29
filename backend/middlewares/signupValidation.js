import {body} from 'express-validator'

export const signupValidation = [
    body("username")
    .isString().withMessage("username must be string")
    .isLength({min:3}).withMessage("username must 3 character long"),

    body("email")
    .isEmail().withMessage("must be valid email address"),

    body("password")
    .isLength({min:5}).withMessage("password must 5 character long"),

    body("gender")
    .exists().notEmpty().withMessage("gender field required")
]