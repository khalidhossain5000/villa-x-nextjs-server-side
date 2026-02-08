import express from 'express'
import { createStripePaymentIntent } from '../controllers/paymentControllers.js'
import { verifyFbToken } from '../middleware/verifyFbToken.js'

const router =express.Router()


router.post('/create-payment-intent',verifyFbToken,createStripePaymentIntent)


export default router