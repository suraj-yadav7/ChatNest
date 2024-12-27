import express from 'express'
import { getUserForSidebar } from '../controllers/user.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const userRouter = express.Router();

userRouter.get('/all', protectRoute, getUserForSidebar)

export default userRouter;