import express from 'express'
import { createStripePaymentIntent } from '../controllers/paymentControllers.js'

const router =express.Router()


router.post('/create-payment-intent',createStripePaymentIntent)