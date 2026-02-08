import express from 'express'
import { getAllRoomCancelRequests, roomCancelRequestByGuest, updateCancelRequestStatus ,getCancelRequestsByUser} from '../controllers/roomCancelRequestControolers.js'

const router=express.Router()


router.post('/room-cancel-request',roomCancelRequestByGuest)
router.get('/all-room-cancel-requests',getAllRoomCancelRequests)

router.patch('/update-status/:id',updateCancelRequestStatus)


router.get('/cancel-requests-by-user/:requestedByEmail',getCancelRequestsByUser)

export default router