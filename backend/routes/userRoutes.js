//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from 'express';
import authenticateUser from '../middlewares/userAuthMiddleware.js';



// ===================== Configuring Express Router =====================
const router = express.Router();

import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';

import { multerUploadUserProfile } from '../config/multerConfig.js';




//? =============================== Routes ===============================


//* ==================== Authentication Routes ====================

router.post('/', registerUser);

router.post('/auth', authUser);

router.post('/logout', logoutUser);

router.route('/profile').get( authenticateUser, getUserProfile ).put( authenticateUser, multerUploadUserProfile.single('profileImage'), updateUserProfile );
// In the above line, the route is same, above line will use the specified controller according to the type of the request







export default router;