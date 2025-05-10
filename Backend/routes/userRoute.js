import express from 'express'
import { registerUser, loginUser,listUser,removeUser } from '../controllers/userController.js';

const userRouter = express.Router()



userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/list",listUser);
userRouter.post("/remove",removeUser);


export default userRouter