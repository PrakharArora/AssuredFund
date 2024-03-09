import express from 'express';
import { deleteBooking, getBookingById, newBooking } from "../Controllers/booking-contoller";

const bookingsRouter = express.Router();

bookingsRouter.post("/" , newBooking);
bookingsRouter.get("/:id" , getBookingById);
bookingsRouter.delete("/:id" , deleteBooking);

export default bookingsRouter;