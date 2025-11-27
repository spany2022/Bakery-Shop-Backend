import express from 'express';
import {
  getRewards,
  redeemReward
} from '../controllers/rewardController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect); // All reward routes are protected

router.get('/', getRewards);
router.post('/redeem', redeemReward);

export default router;


