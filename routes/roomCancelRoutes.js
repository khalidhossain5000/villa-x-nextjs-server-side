import express from 'express'
import { getAllRoomCancelRequests, roomCancelRequestByGuest } from '../controllers/roomCancelRequestControolers.js'

const router=express.Router()


router.post('/room-cancel-request',roomCancelRequestByGuest)
router.get('/all-room-cancel-requests',getAllRoomCancelRequests)

export default router