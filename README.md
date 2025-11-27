# 🥐 Bakery Delight - Backend API

A comprehensive Express.js backend API for the Bakery Delight mobile application with MongoDB integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Replacing Dummy Data](#replacing-dummy-data)

## ✨ Features

- ✅ RESTful API architecture
- ✅ JWT-based authentication
- ✅ MongoDB database with Mongoose ODM
- ✅ TypeScript for type safety
- ✅ Input validation
- ✅ Error handling middleware
- ✅ Security best practices (Helmet, CORS, Rate limiting)
- ✅ Reward points system
- ✅ Order management
- ✅ Cart functionality
- ✅ User profiles with addresses and payment methods
- ✅ Product and category management

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, bcrypt
- **Validation**: express-validator

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic
│   │   ├── productController.ts # Product CRUD
│   │   ├── categoryController.ts # Category CRUD
│   │   ├── cartController.ts    # Cart management
│   │   ├── orderController.ts   # Order management
│   │   ├── addressController.ts # Address management
│   │   ├── paymentController.ts # Payment methods
│   │   ├── userController.ts    # User operations
│   │   └── rewardController.ts  # Rewards system
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts      # Error handling
│   ├── models/
│   │   ├── User.ts              # User schema
│   │   ├── Product.ts           # Product schema
│   │   ├── Category.ts          # Category schema
│   │   ├── Order.ts             # Order schema
│   │   ├── Cart.ts              # Cart schema
│   │   ├── Address.ts           # Address schema
│   │   ├── PaymentMethod.ts     # Payment method schema
│   │   └── Favourite.ts         # Favourites schema
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── categoryRoutes.ts
│   │   ├── cartRoutes.ts
│   │   ├── orderRoutes.ts
│   │   ├── addressRoutes.ts
│   │   ├── paymentRoutes.ts
│   │   ├── userRoutes.ts
│   │   └── rewardRoutes.ts
│   ├── scripts/
│   │   └── seedData.ts          # Database seeding
│   ├── utils/
│   │   └── jwt.ts               # JWT utilities
│   └── server.ts                # Express app entry
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🚀 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Steps

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your actual values.

4. **Start MongoDB** (if using local installation):
   ```bash
   mongod
   ```

5. **Seed the database** (optional but recommended):
   ```bash
   npm run seed
   ```

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/bakery_delight

# For MongoDB Atlas (Production):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bakery_delight

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8081

# Twilio Configuration (for OTP - optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
```

## 🎯 Running the Application

### Development Mode (with hot reload):
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm start
```

### Seed Database:
```bash
npm run seed
```

The server will start on `http://localhost:5000` (or your specified PORT).

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/send-otp` | Send OTP to phone | No |
| POST | `/api/auth/verify-otp` | Verify OTP | No |
| GET | `/api/auth/me` | Get current user | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |

### Products

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/products` | Get all products | No |
| GET | `/api/products?category=Breads` | Filter by category | No |
| GET | `/api/products?search=chocolate` | Search products | No |
| GET | `/api/products?featured=true` | Get featured products | No |
| GET | `/api/products/:id` | Get single product | No |
| POST | `/api/products` | Create product (Admin) | Yes |
| PUT | `/api/products/:id` | Update product (Admin) | Yes |
| DELETE | `/api/products/:id` | Delete product (Admin) | Yes |

### Categories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | No |
| GET | `/api/categories/:id` | Get single category | No |
| POST | `/api/categories` | Create category (Admin) | Yes |
| PUT | `/api/categories/:id` | Update category (Admin) | Yes |
| DELETE | `/api/categories/:id` | Delete category (Admin) | Yes |

### Cart

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/cart` | Get user cart | Yes |
| POST | `/api/cart` | Add item to cart | Yes |
| PUT | `/api/cart/:productId` | Update cart item | Yes |
| DELETE | `/api/cart/:productId` | Remove from cart | Yes |
| DELETE | `/api/cart` | Clear cart | Yes |

### Orders

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/orders` | Create new order | Yes |
| GET | `/api/orders` | Get user orders | Yes |
| GET | `/api/orders?status=pending` | Filter orders | Yes |
| GET | `/api/orders/:id` | Get single order | Yes |
| PUT | `/api/orders/:id/cancel` | Cancel order | Yes |
| PUT | `/api/orders/:id/status` | Update status (Admin) | Yes |

### Addresses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/addresses` | Get user addresses | Yes |
| POST | `/api/addresses` | Create address | Yes |
| PUT | `/api/addresses/:id` | Update address | Yes |
| DELETE | `/api/addresses/:id` | Delete address | Yes |
| PUT | `/api/addresses/:id/default` | Set as default | Yes |

### Payment Methods

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/payments` | Get payment methods | Yes |
| POST | `/api/payments` | Add payment method | Yes |
| DELETE | `/api/payments/:id` | Delete payment method | Yes |
| PUT | `/api/payments/:id/default` | Set as default | Yes |

### User

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/favourites` | Get favourites | Yes |
| POST | `/api/users/favourites/:productId` | Add to favourites | Yes |
| DELETE | `/api/users/favourites/:productId` | Remove from favourites | Yes |
| GET | `/api/users/stats` | Get user statistics | Yes |

### Rewards

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/rewards` | Get user rewards | Yes |
| POST | `/api/rewards/redeem` | Redeem reward | Yes |

## 🗄 Database Models

### User
- name, email, phone, password, avatar
- role (user/admin), isVerified
- rewardPoints, tier (Bronze/Silver/Gold/Platinum)

### Product
- name, description, price, image
- category, rating, reviews, stock
- ingredients, nutrition, features
- isActive, isFeatured

### Category
- name, icon, image, description
- isActive

### Order
- user, orderNumber, items[]
- subtotal, deliveryFee, tax, total
- status, deliveryAddress, paymentMethod
- paymentStatus

### Cart
- user, items[] (product, quantity)

### Address
- user, type (Home/Work/Other)
- address, city, state, zipCode, country
- isDefault

### PaymentMethod
- user, type (card/upi/wallet)
- name, details, isDefault

### Favourite
- user, products[]

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication.

### To authenticate requests:

1. Login or register to get a token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### Example:
```javascript
const response = await fetch('http://localhost:5000/api/cart', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

## 🔄 Replacing Dummy Data with Real MongoDB Data

### Current Implementation (Frontend)

The frontend currently uses static dummy data from `data/bakeryData.ts`. To connect to the real backend:

### Step 1: Create API Service

Create `services/api.ts` in your frontend:

```typescript
const API_URL = 'http://localhost:5000/api'; // Change to your backend URL

export const api = {
  // Products
  getProducts: async (params?: any) => {
    const response = await fetch(`${API_URL}/products?${new URLSearchParams(params)}`);
    return response.json();
  },
  
  // Categories
  getCategories: async () => {
    const response = await fetch(`${API_URL}/categories`);
    return response.json();
  },
  
  // Cart
  getCart: async (token: string) => {
    const response = await fetch(`${API_URL}/cart`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  
  addToCart: async (productId: string, quantity: number, token: string) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId, quantity })
    });
    return response.json();
  },
  
  // Orders
  getOrders: async (token: string, status?: string) => {
    const url = status ? `${API_URL}/orders?status=${status}` : `${API_URL}/orders`;
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },
  
  createOrder: async (orderData: any, token: string) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });
    return response.json();
  },
  
  // Auth
  login: async (phone: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return response.json();
  },
  
  verifyOTP: async (phone: string, otp: string) => {
    const response = await fetch(`${API_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    return response.json();
  }
};
```

### Step 2: Use API in Components

Replace static data imports with API calls:

**Before (using dummy data):**
```typescript
import { products } from "@/data/bakeryData";
```

**After (using API):**
```typescript
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    const result = await api.getProducts();
    if (result.success) {
      setProducts(result.data);
    }
  };
  fetchProducts();
}, []);
```

### Step 3: State Management (Recommended)

For a production app, consider using:
- **React Context** for simple state management
- **Redux Toolkit** for complex state
- **TanStack Query (React Query)** for server state
- **Zustand** for lightweight global state

### Step 4: Store Authentication Token

Use AsyncStorage to persist the JWT token:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save token
await AsyncStorage.setItem('authToken', token);

// Get token
const token = await AsyncStorage.getItem('authToken');

// Remove token (logout)
await AsyncStorage.removeItem('authToken');
```

### Step 5: Update Navigation Logic

Update `app/splash.tsx`:

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      // Verify token is valid
      const result = await api.verifyToken(token);
      if (result.success) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/login");
      }
    } else {
      router.replace("/(auth)/login");
    }
  };
  
  const timer = setTimeout(checkAuth, 2500);
  return () => clearTimeout(timer);
}, []);
```

## 📊 Database Schema Examples

### Creating a Product (Admin)

```json
POST /api/products
{
  "name": "Chocolate Croissant",
  "description": "Flaky croissant filled with chocolate",
  "price": 4.99,
  "image": "🥐",
  "category": "CATEGORY_ID_HERE",
  "categoryName": "Pastries",
  "stock": 50,
  "ingredients": ["Flour", "Butter", "Chocolate", "Sugar"],
  "nutrition": {
    "calories": 320,
    "protein": 6,
    "fat": 18,
    "carbs": 36
  },
  "features": ["Fresh Daily", "Premium Chocolate"],
  "isFeatured": true
}
```

### Creating an Order

```json
POST /api/orders
{
  "items": [
    {
      "product": "PRODUCT_ID",
      "productName": "Sourdough Bread",
      "productImage": "🍞",
      "quantity": 2,
      "price": 5.99
    }
  ],
  "deliveryAddress": {
    "type": "Home",
    "address": "123 Main Street, Apt 4B, New York, NY 10001"
  },
  "paymentMethod": "card",
  "notes": "Please ring doorbell"
}
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token expiration
- Protected routes with middleware
- Input validation
- Rate limiting (can be added)
- Helmet for security headers
- CORS configuration

## 🧪 Testing the API

### Using cURL:

```bash
# Get all products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"+15551234567"}'

# Get user cart (with token)
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman or Insomnia:

Import the endpoints and test them with proper headers and body.

## 📝 Default Credentials (After Seeding)

**Admin User:**
- Phone: `+1234567890`
- Password: `admin123`

**Demo User:**
- Phone: `+15551234567`
- Password: `user123`

## 🎨 Frontend Integration Checklist

- [ ] Install `@react-native-async-storage/async-storage` for token storage
- [ ] Create `services/api.ts` with all API calls
- [ ] Create auth context/provider for global auth state
- [ ] Replace all dummy data imports with API calls
- [ ] Add loading states while fetching data
- [ ] Add error handling and display error messages
- [ ] Implement pull-to-refresh on lists
- [ ] Add token refresh logic
- [ ] Handle network errors gracefully
- [ ] Add optimistic updates for better UX

## 🚢 Deployment

### Backend Deployment Options:

1. **Railway.app** (Recommended for beginners)
2. **Heroku** (Easy deployment)
3. **AWS EC2** (Full control)
4. **DigitalOcean** (VPS)
5. **Vercel/Netlify** (Serverless functions)

### MongoDB Hosting:

1. **MongoDB Atlas** (Recommended - Free tier available)
   - Create cluster at https://www.mongodb.com/cloud/atlas
   - Get connection string
   - Update MONGODB_URI in .env

## 🐛 Common Issues & Solutions

### Issue: Cannot connect to MongoDB
**Solution**: 
- Check if MongoDB is running: `mongosh`
- Verify MONGODB_URI in .env file
- For Atlas: Check IP whitelist and credentials

### Issue: CORS errors from frontend
**Solution**: 
- Update FRONTEND_URL in .env
- Verify CORS configuration in server.ts

### Issue: Authentication fails
**Solution**: 
- Check if JWT_SECRET is set in .env
- Verify token is being sent in Authorization header
- Check token format: `Bearer YOUR_TOKEN`

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

## 👨‍💻 Development Tips

1. **Use environment-specific configs**: Separate dev and production configs
2. **Add request logging**: Morgan is already configured
3. **Implement caching**: Use Redis for frequently accessed data
4. **Add rate limiting**: Protect against abuse
5. **Write tests**: Add Jest for unit and integration tests
6. **API documentation**: Consider adding Swagger/OpenAPI docs
7. **Monitoring**: Add tools like PM2, New Relic, or DataDog

## 📄 License

MIT

## 🤝 Support

For support, email support@bakerydelight.com or create an issue in the repository.

---

Made with ❤️ for Bakery Delight


