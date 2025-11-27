import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
  updateOrderStatus
} from '../controllers/orderController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.use(protect); // All order routes are protected

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);
router.put('/:id/status', authorize('admin'), updateOrderStatus);

export default router;


