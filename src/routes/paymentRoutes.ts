import express from 'express';
import {
  getPaymentMethods,
  createPaymentMethod,
  deletePaymentMethod,
  setDefaultPaymentMethod
} from '../controllers/paymentController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect); // All payment routes are protected

router.get('/', getPaymentMethods);
router.post('/', createPaymentMethod);
router.delete('/:id', deletePaymentMethod);
router.put('/:id/default', setDefaultPaymentMethod);

export default router;


