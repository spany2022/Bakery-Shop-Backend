// import express from 'express';
// import {
//   register,
//   login,
//   sendOTP,
//   verifyOTP,
//   getMe,
//   updateProfile
// } from '../controllers/authController';
// import { protect } from '../middleware/auth';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);
// router.post('/send-otp', sendOTP);
// router.post('/verify-otp', verifyOTP);
// router.get('/me', protect, getMe);
// router.put('/profile', protect, updateProfile);

// export default router;





// // routes/authRoutes.ts
// import express from 'express';
// import {
//   sendOTP,
//   verifyOTP,
//   getMe,
//   updateProfile,
// } from '../controllers/authController';
// import { protect } from '../middleware/auth';

// const router = express.Router();

// // OTP-based auth
// router.post('/send-otp', sendOTP);
// router.post('/verify-otp', verifyOTP);

// // Authenticated user routes
// router.get('/me', protect, getMe);
// router.put('/profile', protect, updateProfile);

// export default router;





// routes/authRoutes.ts
import express from 'express';
import { sendOTP, verifyOTP, getMe, updateProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// OTP-based login
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

// Logged-in user endpoints
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
