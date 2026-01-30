import express from 'express'

import { registerUserSchema } from '../validation/userValidation.js'
import { getUserData, getUserRole, registerUser } from '../controllers/authControllers.js'
import { validateRequest } from '../middleware/registerUserValidate.js'

const router=express.Router()

//user registeration data save api
router.post('/register',validateRequest(registerUserSchema),registerUser)

// get role by email
router.get("/role", getUserRole);

router.get('/all-users',getUserData)
export default router