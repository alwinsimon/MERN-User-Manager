//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
import { requireAuth, validateRequest } from "base-auth-handler";

import verifyAdmin from "../../middlewares/verifyAdminMiddleware.js";

// ===================== Configuring Express Router =====================
const router = express.Router();

import {
  authAdmin,
  registerAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  updateUserData,
  blockUser,
  unBlockUser
} from "../../controllers/adminController.js";

// Data validation configuration
import {
  adminSignInDataValidation,
  adminSignUpDataValidation,
  adminUserBlockingDataValidation,
  adminUserUpdateDataValidation,
} from "./backendDataValidationConfig.js";

//? =============================== Routes ===============================

//* ==================== Authentication Routes ====================

router.post("/", adminSignUpDataValidation, validateRequest, registerAdmin);

router.post("/auth", adminSignInDataValidation, validateRequest, authAdmin);

router.post("/logout", logoutAdmin);


//* ==================== Admin Profile Routes ====================

router
  .route("/profile")
  .get(requireAuth, verifyAdmin, getAdminProfile)
  .put(requireAuth, verifyAdmin, updateAdminProfile);
// In the above line, the route is same, above line will use the specified controller according to the type of the request


//* ==================== User Management Routes ====================

router.post("/get-users", requireAuth, verifyAdmin, getAllUsers);

router.patch("/block-user", requireAuth, verifyAdmin, adminUserBlockingDataValidation, validateRequest, blockUser);

router.patch("/unblock-user", requireAuth, verifyAdmin, adminUserBlockingDataValidation, validateRequest, unBlockUser);

router.put("/update-user", requireAuth, verifyAdmin, adminUserUpdateDataValidation, validateRequest, updateUserData);

export default router;
