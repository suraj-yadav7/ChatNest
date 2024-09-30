import express from 'express'
import {signup, login, logout, forgetPassword, updatePassword } from '../controllers/auth.controller.js'
import { loginValidation, signupValidation } from '../middlewares/inputValidation.js'

const authRouter = express.Router()

authRouter.post("/login",loginValidation ,login)
authRouter.post("/signup", signupValidation, signup)
authRouter.post("/logout", logout)
authRouter.post("/forget-password", forgetPassword)
authRouter.post("/update-password", updatePassword)

export default authRouter;