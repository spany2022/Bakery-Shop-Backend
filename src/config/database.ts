import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {

    const uri =  "mongodb+srv://sandesh2002pany_db_user:bakeryShopPassword@cluster0.ossg2pk.mongodb.net/bakery_db";
    // const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery_delight');
    // const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery_delight');

    
    // console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log("📌 Using MongoDB URI →", uri.includes("mongodb+srv") ? "ATLAS CLOUD 😎" : "LOCALHOST 🏠");

    const conn = await mongoose.connect(uri);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;


