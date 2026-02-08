import express from "express";
import { createBooking, deleteBooking, getBookedDatesByRoom, getMyBookings ,hostRoomBookedInfoData} from "../controllers/bookingControllers.js";
import { verifyFbToken } from "../middleware/verifyFbToken.js";
import { verifyHost } from "../middleware/verifyHost.js";


const router = express.Router();

//only host can create booking for room so host validation added
router.post("/bookings",verifyFbToken, createBooking);


//user for public ok this one
router.get('/booked-rooms/:roomId',getBookedDatesByRoom)

//this is for host my bookng show
router.get('/my-bookings/:email',verifyFbToken,getMyBookings)

//deleteing booking when approved cancel request by host 
router.delete('/delete-booking/:bookingId',verifyFbToken,verifyHost,deleteBooking)

//getting host i mean host je je room add korce sei room eh j j booking korce tar data eta
route.get('/host-room-booking-info',verifyFbToken,verifyHost,hostRoomBookedInfoData)

export default router;
