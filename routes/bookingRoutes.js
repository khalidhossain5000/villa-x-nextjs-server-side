import express from "express";
import { createBooking, getBookedDatesByRoom } from "../controllers/bookingControllers.js";


const router = express.Router();

router.post("/bookings", createBooking);

router.get('/booked-rooms/:roomId',getBookedDatesByRoom)
export default router;
