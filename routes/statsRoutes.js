import express from 'express'

import { verifyFbToken } from '../middleware/verifyFbToken.js'
import { verifyHost } from '../middleware/verifyHost.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js'
import { getAdminStatsData, getGuestStatsData, getHostChartData, getHostStats } from '../controllers/statsControllers.js';

const router=express.Router()



router.get("/host/:hostEmail",verifyFbToken,verifyHost, getHostStats);

router.get("/host-chart-data/:hostEmail",verifyFbToken,verifyHost,getHostChartData)

//admin rotute
router.get('/admin/stats/:adminEmail',verifyFbToken,verifyAdmin,getAdminStatsData)

//guest user data

router.get('/guest-stats/:guestEmail',verifyFbToken,getGuestStatsData)
export default router