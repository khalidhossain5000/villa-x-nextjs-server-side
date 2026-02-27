import express from 'express'
import { getAllRoomCancelRequests, roomCancelRequestByGuest, updateCancelRequestStatus ,getCancelRequestsByUser} from '../controllers/roomCancelRequestControolers.js'
import { verifyFbToken } from '../middleware/verifyFbToken.js'
import { verifyHost } from '../middleware/verifyHost.js'

const router=express.Router()


router.post('/room-cancel-request',verifyFbToken,roomCancelRequestByGuest)
router.get('/all-room-cancel-requests/:hostEmail',verifyFbToken,verifyHost,getAllRoomCancelRequests)

router.patch('/update-status/:id',verifyFbToken,verifyHost,updateCancelRequestStatus)


router.get('/cancel-requests-by-user/:requestedByEmail',verifyFbToken,getCancelRequestsByUser)

export default router