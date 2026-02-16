import express from 'express'

import { verifyFbToken } from '../middleware/verifyFbToken.js'
import { verifyHost } from '../middleware/verifyHost.js'
import { getHostChartData, getHostStats } from '../controllers/statsControllers.js';

const router=express.Router()



router.get("/host/:hostEmail", getHostStats);

router.get("/host-chart-data/:hostEmail",getHostChartData)

export default router