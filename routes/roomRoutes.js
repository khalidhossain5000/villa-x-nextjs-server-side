import { addRoom, getAllRooms } from "../controllers/roomControllers.js";
import express from "express"
import { validateRequest } from "../middleware/registerUserValidate.js";
import { roomSchema } from "../validation/room.validation.js";

const router=express.Router()


router.post('/rooms',validateRequest(roomSchema),addRoom)
// get all room data form public show
router.get('/rooms',getAllRooms)
export default router