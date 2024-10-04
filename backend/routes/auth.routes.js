import express from 'express'
import {signup, login, logout, forgetPassword, updatePassword, getUserForSidebar } from '../controllers/auth.controller.js'
import { loginValidation, signupValidation } from '../middlewares/inputValidation.js'
import protectRoute from '../middlewares/protectRoute.js'

const authRouter = express.Router()

authRouter.post("/login",  loginValidation,  login)
authRouter.post("/signup", signupValidation, signup)
authRouter.post("/logout", logout)
authRouter.post("/forget-password", forgetPassword)
authRouter.post("/update-password", updatePassword)

// getting all user's for sidebar
authRouter.get("/alluser", protectRoute, getUserForSidebar)

export default authRouter;