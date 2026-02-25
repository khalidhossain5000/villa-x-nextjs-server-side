import { addRoom, delteMyListingRoom, getAllRooms, updateRoom } from "../controllers/roomControllers.js";
import express from "express"
import { validateRequest } from "../middleware/registerUserValidate.js";
import { roomSchema } from "../validation/room.validation.js";
import { verifyFbToken } from "../middleware/verifyFbToken.js";
import { verifyHost } from "../middleware/verifyHost.js";

const router=express.Router()

  
router.post('/rooms',verifyFbToken,verifyHost,validateRequest(roomSchema),addRoom)
// get all room data form public show
router.get('/rooms',getAllRooms)
router.delete('/rooms/:id',verifyFbToken,verifyHost,delteMyListingRoom)

router.put('/update-room/:id',updateRoom)
export default router