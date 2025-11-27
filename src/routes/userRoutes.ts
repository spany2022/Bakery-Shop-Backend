import express from 'express';
import {
  getFavourites,
  addToFavourites,
  removeFromFavourites,
  getUserStats
} from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect); // All user routes are protected

router.get('/favourites', getFavourites);
router.post('/favourites/:productId', addToFavourites);
router.delete('/favourites/:productId', removeFromFavourites);
router.get('/stats', getUserStats);

export default router;


