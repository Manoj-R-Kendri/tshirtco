import express from 'express';
import { getMe, updateProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(protect);

// Get current user profile
router.get('/me', getMe);

// Update user profile
router.put('/profile', updateProfile);

export default router;
