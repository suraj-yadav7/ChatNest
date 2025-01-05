import express from 'express'
import { getUserForSidebar, getUserFriends } from '../controllers/user.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const userRouter = express.Router();

userRouter.get('/all', protectRoute, getUserForSidebar);
userRouter.get("/user-friend", protectRoute, getUserFriends);

export default userRouter;