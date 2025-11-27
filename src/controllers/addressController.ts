import { Response } from 'express';
import Address from '../models/Address';
import { AuthRequest } from '../middleware/auth';

// @desc    Get user addresses
// @route   GET /api/addresses
// @access  Private
export const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const addresses = await Address.find({ user: req.user?._id }).sort({ isDefault: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: addresses.length,
      data: addresses
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create address
// @route   POST /api/addresses
// @access  Private
export const createAddress = async (req: AuthRequest, res: Response) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user?._id
    });

    res.status(201).json({
      success: true,
      data: address
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update address
// @route   PUT /api/addresses/:id
// @access  Private
export const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    let address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Make sure user owns address
    if (address.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this address'
      });
    }

    address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: address
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete address
// @route   DELETE /api/addresses/:id
// @access  Private
export const deleteAddress = async (req: AuthRequest, res: Response) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Make sure user owns address
    if (address.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this address'
      });
    }

    await address.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Set default address
// @route   PUT /api/addresses/:id/default
// @access  Private
export const setDefaultAddress = async (req: AuthRequest, res: Response) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Make sure user owns address
    if (address.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      data: address
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


