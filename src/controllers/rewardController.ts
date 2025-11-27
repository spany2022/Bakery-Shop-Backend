import { Response } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

interface Offer {
  id: string;
  title: string;
  description: string;
  points: number;
  icon: string;
}

const offers: Offer[] = [
  {
    id: "1",
    title: "Free Donut",
    description: "Get a free donut on your next order",
    points: 100,
    icon: "🍩",
  },
  {
    id: "2",
    title: "20% Off",
    description: "20% discount on all cakes",
    points: 200,
    icon: "🎂",
  },
  {
    id: "3",
    title: "Free Delivery",
    description: "Free delivery on your next 3 orders",
    points: 150,
    icon: "🚚",
  },
  {
    id: "4",
    title: "Buy 1 Get 1",
    description: "BOGO on all cookies",
    points: 250,
    icon: "🍪",
  },
];

// @desc    Get user rewards
// @route   GET /api/rewards
// @access  Private
export const getRewards = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?._id);

    res.status(200).json({
      success: true,
      data: {
        points: user?.rewardPoints || 0,
        tier: user?.tier || 'Bronze',
        offers
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Redeem reward
// @route   POST /api/rewards/redeem
// @access  Private
export const redeemReward = async (req: AuthRequest, res: Response) => {
  try {
    const { offerId } = req.body;

    const offer = offers.find(o => o.id === offerId);

    if (!offer) {
      return res.status(404).json({
        success: false,
        message: 'Offer not found'
      });
    }

    const user = await User.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.rewardPoints < offer.points) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient reward points'
      });
    }

    // Deduct points
    user.rewardPoints -= offer.points;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Reward redeemed successfully',
      data: {
        points: user.rewardPoints,
        redeemedOffer: offer
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


