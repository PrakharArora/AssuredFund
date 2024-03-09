import express from 'express';
import { addAdmin, adminLogin, allAdmins } from '../Controllers/admin-Controller';
const adminRouter = express.Router();

adminRouter.post("/signup" , addAdmin);
adminRouter.post("/login" , adminLogin);
adminRouter.get("/allAdmins" , allAdmins)

export default adminRouter;