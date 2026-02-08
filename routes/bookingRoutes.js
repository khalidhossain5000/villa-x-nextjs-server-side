import express from "express";
import { createBooking, deleteBooking, getBookedDatesByRoom, getMyBookings } from "../controllers/bookingControllers.js";


const router = express.Router();

router.post("/bookings", createBooking);

router.get('/booked-rooms/:roomId',getBookedDatesByRoom)


router.get('/my-bookings/:email',getMyBookings)

router.delete('/delete-booking/:bookingId',deleteBooking)



export default router;
