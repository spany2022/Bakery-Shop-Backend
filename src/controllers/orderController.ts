import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, deliveryAddress, paymentMethod, notes } = req.body;

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0
    );
    
    const deliveryFee = subtotal > 50 ? 0 : 4.99;
    const tax = subtotal * 0.08;
    const total = subtotal + deliveryFee + tax;

    // Create order
    const order = await Order.create({
      user: req.user?._id,
      items,
      subtotal,
      deliveryFee,
      tax,
      total,
      deliveryAddress,
      paymentMethod,
      notes,
      paymentStatus: 'paid' // For demo
    });

    // Award reward points (10 points per dollar)
    await User.findByIdAndUpdate(req.user?._id, {
      $inc: { rewardPoints: Math.floor(total * 10) }
    });

    // Clear cart
    await Cart.findOneAndUpdate(
      { user: req.user?._id },
      { items: [] }
    );

    res.status(201).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders
// @access  Private
export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.query;
    
    let query: any = { user: req.user?._id };
    
    if (status) {
      if (status === 'pending') {
        query.status = { $in: ['pending', 'preparing', 'ready'] };
      } else if (status === 'completed') {
        query.status = { $in: ['delivered', 'cancelled'] };
      }
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure user owns order
    if (order.user.toString() !== req.user?._id.toString() && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure user owns order
    if (order.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Check if order can be cancelled (within 5 minutes)
    const minutesSinceOrder = (Date.now() - order.createdAt.getTime()) / (1000 * 60);
    
    if (minutesSinceOrder > 5) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled after 5 minutes'
      });
    }

    order.status = 'cancelled';
    order.paymentStatus = 'refunded';
    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


