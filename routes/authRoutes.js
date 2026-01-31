import express from 'express'

import { registerUserSchema } from '../validation/userValidation.js'
import { getUserData, getUserInfo, getUserRole, registerUser, updateUser, updateUserRoleAdminApi } from '../controllers/authControllers.js'
import { validateRequest } from '../middleware/registerUserValidate.js'

const router=express.Router()

//user registeration data save api
router.post('/register',validateRequest(registerUserSchema),registerUser)

// get role by email
router.get("/role", getUserRole);

router.get('/all-users',getUserData)
router.get('/single-users',getUserInfo)

router.patch('/update-user/:userEmail',updateUser)
router.patch('/update-user-role-admin/:id/role',updateUserRoleAdminApi)
export default router