// src/routes/adminRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createAdmin,
  getDashboardStats,
  updateUserToAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// Apply admin middleware to all routes
router.use(protect);
router.use(admin);

// Dashboard routes
router.get("/dashboard", getDashboardStats);

// User management routes
router.route('/users')
  .get(getAllUsers);

router.route('/users/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router.route('/users/:id/make-admin')
  .put(updateUserToAdmin);

router.post("/users/admin", createAdmin);

// Product management routes (to be implemented)
// router.route('/products')
//   .get()
//   .post();

// router.route('/products/:id')
//   .get()
//   .put()
//   .delete();

// Order management routes (to be implemented)
// router.route('/orders')
//   .get();

// router.route('/orders/:id')
//   .get()
//   .put();

export default router;
