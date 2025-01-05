import express from 'express'
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.get("/get/:id",   protectRoute, getMessage);

export default messageRouter;