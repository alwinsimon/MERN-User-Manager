//? ===================================================== User Routes =====================================================

// ===================== Importing necessary modules/files =====================
import express from "express";

// Custom Authentication middleware from my npm package.
// Reference: https://www.npmjs.com/package/base-auth-handler
import { requireAuth } from "base-auth-handler";

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
  deleteUserData,
  updateUserData,
} from "../../controllers/adminController.js";

//? =============================== Routes ===============================

//* ==================== Authentication Routes ====================

router.post("/", registerAdmin);

router.post("/auth", authAdmin);

router.post("/logout", requireAuth, logoutAdmin);


//* ==================== Admin Profile Routes ====================

router
  .route("/profile")
  .get(requireAuth, verifyAdmin, getAdminProfile)
  .put(requireAuth, verifyAdmin, updateAdminProfile);
// In the above line, the route is same, above line will use the specified controller according to the type of the request


//* ==================== User Management Routes ====================

router.post("/get-users", requireAuth, verifyAdmin, getAllUsers);

router.delete("/delete-user", requireAuth, verifyAdmin, deleteUserData);

router.put("/update-user", requireAuth, verifyAdmin, updateUserData);

export default router;
