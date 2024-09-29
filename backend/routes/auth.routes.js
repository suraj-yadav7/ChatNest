import express from 'express'
import {signup, login, logout } from '../controllers/auth.controller.js'
import { signupValidation } from '../middlewares/signupValidation.js'

const authRouter = express.Router()

authRouter.get("/login", login)
authRouter.post("/signup", signupValidation, signup)
authRouter.post("/logout", logout)

export default authRouter;