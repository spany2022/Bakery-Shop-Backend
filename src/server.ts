import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/database';
import errorHandler from './middleware/errorHandler';

// Import routes
import addressRoutes from './routes/addressRoutes';
import authRoutes from './routes/authRoutes';
import cartRoutes from './routes/cartRoutes';
import categoryRoutes from './routes/categoryRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import productRoutes from './routes/productRoutes';
import rewardRoutes from './routes/rewardRoutes';
import userRoutes from './routes/userRoutes';

// Load environment variables
dotenv.config();
console.log("🔍 Loaded MONGODB_URI:", process.env.MONGODB_URI);
console.log("🔍 Loaded FRONTEND_URL:", process.env.FRONTEND_URL);

// Create Express app
const app: Application = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8081',
  credentials: true
}));
app.use(morgan('dev')); // Logging
app.use(compression()); // Compress responses
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/rewards', rewardRoutes);

// // Health check route
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });


app.get("/health", (req, res) => {
  console.log("🔥 HEALTH endpoint requested by:", req.headers.origin || req.ip);
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;


