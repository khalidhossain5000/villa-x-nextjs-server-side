import express from 'express'
import { getAllRoomCancelRequests, roomCancelRequestByGuest, updateCancelRequestStatus } from '../controllers/roomCancelRequestControolers.js'

const router=express.Router()


router.post('/room-cancel-request',roomCancelRequestByGuest)
router.get('/all-room-cancel-requests',getAllRoomCancelRequests)

router.patch('/update-status/:id',updateCancelRequestStatus)
export default router