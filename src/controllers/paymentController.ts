import { Response } from 'express';
import PaymentMethod from '../models/PaymentMethod';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user payment methods
// @route   GET /api/payments
// @access  Private
export const getPaymentMethods = async (req: AuthRequest, res: Response) => {
  try {
    const methods = await PaymentMethod.find({ user: req.user?._id }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: methods.length,
      data: methods
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create payment method
// @route   POST /api/payments
// @access  Private
export const createPaymentMethod = async (req: AuthRequest, res: Response) => {
  try {
    const method = await PaymentMethod.create({
      ...req.body,
      user: req.user?._id
    });

    res.status(201).json({
      success: true,
      data: method
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete payment method
// @route   DELETE /api/payments/:id
// @access  Private
export const deletePaymentMethod = async (req: AuthRequest, res: Response) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);

    if (!method) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }

    // Make sure user owns payment method
    if (method.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await method.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Payment method deleted successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Set default payment method
// @route   PUT /api/payments/:id/default
// @access  Private
export const setDefaultPaymentMethod = async (req: AuthRequest, res: Response) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);

    if (!method) {
      return res.status(404).json({
        success: false,
        message: 'Payment method not found'
      });
    }

    // Make sure user owns payment method
    if (method.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    method.isDefault = true;
    await method.save();

    res.status(200).json({
      success: true,
      data: method
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


