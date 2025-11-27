import { Response } from 'express';
import User from '../models/User';
import Favourite from '../models/Favourite';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user favourites
// @route   GET /api/users/favourites
// @access  Private
export const getFavourites = async (req: AuthRequest, res: Response) => {
  try {
    let favourites = await Favourite.findOne({ user: req.user?._id }).populate('products');

    if (!favourites) {
      favourites = await Favourite.create({ user: req.user?._id, products: [] });
    }

    res.status(200).json({
      success: true,
      data: favourites
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add to favourites
// @route   POST /api/users/favourites/:productId
// @access  Private
export const addToFavourites = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    let favourites = await Favourite.findOne({ user: req.user?._id });

    if (!favourites) {
      favourites = await Favourite.create({
        user: req.user?._id,
        products: [productId]
      });
    } else {
      if (!favourites.products.includes(productId as any)) {
        favourites.products.push(productId as any);
        await favourites.save();
      }
    }

    await favourites.populate('products');

    res.status(200).json({
      success: true,
      data: favourites
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove from favourites
// @route   DELETE /api/users/favourites/:productId
// @access  Private
export const removeFromFavourites = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const favourites = await Favourite.findOne({ user: req.user?._id });

    if (!favourites) {
      return res.status(404).json({
        success: false,
        message: 'Favourites not found'
      });
    }

    favourites.products = favourites.products.filter(
      id => id.toString() !== productId
    );

    await favourites.save();
    await favourites.populate('products');

    res.status(200).json({
      success: true,
      data: favourites
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req: AuthRequest, res: Response) => {
  try {
    const Order = require('../models/Order').default;
    
    const orders = await Order.find({ user: req.user?._id });
    const totalOrders = orders.length;
    const completedOrders = orders.filter((o: any) => o.status === 'delivered').length;
    const totalSpent = orders.reduce((sum: number, o: any) => sum + o.total, 0);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        completedOrders,
        totalSpent: parseFloat(totalSpent.toFixed(2)),
        rewardPoints: req.user?.rewardPoints || 0,
        tier: req.user?.tier || 'Bronze'
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


