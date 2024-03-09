import express from "express";
import { sendEmail } from "../Controllers/Email-Controller";

const mailRouter = express.Router();

mailRouter.post("/sendEmail" , sendEmail);

export default mailRouter;