import express from 'express'

import { registerUserSchema } from '../validation/userValidation.js'
import { getUserData, getUserInfo, getUserRole, registerUser, updateName, updateUser, updateUserRoleAdminApi } from '../controllers/authControllers.js'
import { validateRequest } from '../middleware/registerUserValidate.js'
import { verifyFbToken } from '../middleware/verifyFbToken.js'
import { verifyAdmin } from '../middleware/verifyAdmin.js'

const router=express.Router()

//user registeration data save api
router.post('/register',validateRequest(registerUserSchema),registerUser)

// get role by email dont need admin but need token validation
router.get("/role",verifyFbToken, getUserRole);
//admin route need both valiation
router.get('/all-users'  , verifyFbToken,  verifyAdmin,   getUserData)

//guest validation route needed here 
router.get('/single-users',verifyFbToken,getUserInfo)

//update user this also need user validation
router.patch('/update-user/:userEmail',verifyFbToken,updateUser)

router.patch('/update-name/:email',verifyFbToken,updateName)



//admin updating user role to admin so need both validation -->admin route

router.patch('/update-user-role-admin/:id/role',verifyFbToken,verifyAdmin,updateUserRoleAdminApi)
export default router