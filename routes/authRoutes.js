import express from 'express'

import { registerUserSchema } from '../validation/userValidation.js'
import { registerUser } from '../controllers/authControllers.js'
import { validateRequest } from '../middleware/registerUserValidate.js'

const router=express.Router()

//user registeration data save api
router.post('/register',validateRequest(registerUserSchema),registerUser)




export default router