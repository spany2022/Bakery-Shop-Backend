# 🚀 Quick Setup Guide

## Prerequisites

- Node.js v18 or higher installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
# On Windows (PowerShell)
copy .env.example .env

# On macOS/Linux
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/bakery_delight
JWT_SECRET=your_secret_key_change_this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8081
```

### 3. Start MongoDB

**Option A: Local MongoDB**
```bash
# On Windows
net start MongoDB

# On macOS (Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env` file

### 4. Seed the Database (Optional but Recommended)

```bash
npm run seed
```

This will create:
- 6 categories (Breads, Cakes, Pastries, etc.)
- 12 sample products
- Admin user (phone: +1234567890, password: admin123)
- Demo user (phone: +15551234567, password: user123)

### 5. Start the Development Server

```bash
npm run dev
```

The server will start at `http://localhost:5000`

### 6. Test the API

Open your browser or Postman and try:

```
http://localhost:5000/health
```

You should see:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

Try getting products:
```
http://localhost:5000/api/products
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database
npm run seed
```

## Connecting Frontend to Backend

1. **Start the backend server** (Port 5000)
2. **Update frontend** to use the API service:
   - Use the `services/api.ts` file
   - Replace dummy data imports with API calls
   - Store JWT token using AsyncStorage

3. **Install AsyncStorage** in frontend:
```bash
cd ..  # Go back to project root
npx expo install @react-native-async-storage/async-storage
```

4. **Update API URL** in `services/api.ts`:
```typescript
const API_URL = 'http://YOUR_COMPUTER_IP:5000/api';
// Example: 'http://192.168.1.100:5000/api'
```

**Note**: Don't use `localhost` in the React Native app if you're testing on a physical device. Use your computer's local IP address.

## Troubleshooting

### Problem: Cannot connect to MongoDB
**Solution:**
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- For Atlas: Check IP whitelist

### Problem: Port 5000 already in use
**Solution:**
Change `PORT` in `.env` file to another port (e.g., 5001)

### Problem: JWT authentication fails
**Solution:**
Make sure `JWT_SECRET` is set in `.env` file

### Problem: CORS errors from frontend
**Solution:**
Update `FRONTEND_URL` in `.env` to match your Expo dev server URL

## Next Steps

1. ✅ Backend is running
2. 📱 Update frontend to use API service
3. 🔐 Implement authentication flow in frontend
4. 💾 Use AsyncStorage for token persistence
5. 🎨 Add loading states and error handling
6. 🧪 Test all features

## Production Deployment

For deploying to production, see the main README.md file for detailed instructions on:
- Deploying to Railway, Heroku, or AWS
- Setting up MongoDB Atlas
- Environment variables for production
- Security best practices

---

Need help? Check the main `README.md` or backend documentation.


