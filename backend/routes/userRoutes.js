//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
import { requireAuth } from "base-auth-handler";

import verifyUser from "../middlewares/verifyUserMiddleware.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

import { multerUploadUserProfile } from "../config/multerConfig.js";

// ===================== Configuring Express Router =====================
const router = express.Router();

//? =============================== Routes ===============================

//* ==================== Authentication Routes ====================

router.post("/", registerUser);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

//* ==================== User Profile Routes ====================

router
  .route("/profile")
  .get(requireAuth, verifyUser, getUserProfile)
  .put(
    requireAuth,
    verifyUser,
    multerUploadUserProfile.single("profileImage"),
    updateUserProfile
  );
// In the above line, the route is same, above line will use the specified controller according to the type of the request

export default router;
