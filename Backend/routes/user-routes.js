import express from 'express';
import { deleteUser, getAllusers, signup, updateUser, userLogin , getBookingsOfUser } from '../Controllers/user-Controller';
 
const userRouter = express.Router();

userRouter.get("/" , getAllusers);
userRouter.post("/signup" , signup);
userRouter.put("/:id" , updateUser);
userRouter.delete("/:id" , deleteUser);
userRouter.post("/login" , userLogin);
userRouter.get("/bookings/:id",getBookingsOfUser)
export default userRouter;