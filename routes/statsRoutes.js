import express from 'express'

import { verifyFbToken } from '../middleware/verifyFbToken.js'
import { verifyHost } from '../middleware/verifyHost.js'
import { getAdminStatsData, getGuestStatsData, getHostChartData, getHostStats } from '../controllers/statsControllers.js';

const router=express.Router()



router.get("/host/:hostEmail", getHostStats);

router.get("/host-chart-data/:hostEmail",getHostChartData)

//admin rotute
router.get('/admin/stats/:adminEmail',getAdminStatsData)

//guest user data

router.get('/guest-stats/:guestEmail',getGuestStatsData)
export default router