import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';
import Product from '../models/Product';
import User from '../models/User';

dotenv.config();

const categories = [
  {
    name: "Breads",
    icon: "🍞",
    image: "bread",
    description: "Fresh baked breads daily"
  },
  {
    name: "Cakes",
    icon: "🎂",
    image: "cake",
    description: "Delicious custom cakes"
  },
  {
    name: "Pastries",
    icon: "🥐",
    image: "pastry",
    description: "Buttery flaky pastries"
  },
  {
    name: "Cookies",
    icon: "🍪",
    image: "cookie",
    description: "Freshly baked cookies"
  },
  {
    name: "Donuts",
    icon: "🍩",
    image: "donut",
    description: "Sweet glazed donuts"
  },
  {
    name: "Pies",
    icon: "🥧",
    image: "pie",
    description: "Homemade pies"
  },
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bakery_delight');
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create products
    const products = [
      // Breads
      {
        name: "Sourdough Bread",
        description: "Artisan sourdough with a crispy crust and soft interior",
        price: 5.99,
        image: "🍞",
        category: createdCategories[0]._id,
        categoryName: "Breads",
        rating: 4.8,
        reviews: 156,
        stock: 50,
        isFeatured: true,
        ingredients: ["Flour", "Water", "Salt", "Sourdough starter"],
        nutrition: { calories: 245, protein: 12, fat: 2, carbs: 48 },
        features: ["Fresh Daily", "No Preservatives", "Artisan Made"]
      },
      {
        name: "Baguette",
        description: "Classic French baguette, freshly baked daily",
        price: 3.99,
        image: "🥖",
        category: createdCategories[0]._id,
        categoryName: "Breads",
        rating: 4.7,
        reviews: 203,
        stock: 60,
        ingredients: ["Flour", "Water", "Yeast", "Salt"],
        nutrition: { calories: 220, protein: 10, fat: 1, carbs: 45 }
      },
      // Cakes
      {
        name: "Chocolate Cake",
        description: "Rich chocolate cake with chocolate ganache",
        price: 24.99,
        image: "🍰",
        category: createdCategories[1]._id,
        categoryName: "Cakes",
        rating: 4.9,
        reviews: 342,
        stock: 20,
        isFeatured: true,
        ingredients: ["Flour", "Cocoa", "Sugar", "Eggs", "Butter"],
        nutrition: { calories: 450, protein: 6, fat: 22, carbs: 58 }
      },
      {
        name: "Red Velvet Cake",
        description: "Classic red velvet with cream cheese frosting",
        price: 26.99,
        image: "🎂",
        category: createdCategories[1]._id,
        categoryName: "Cakes",
        rating: 4.8,
        reviews: 278,
        stock: 15,
        isFeatured: true
      },
      // Pastries
      {
        name: "Croissant",
        description: "Buttery, flaky French croissant",
        price: 3.49,
        image: "🥐",
        category: createdCategories[2]._id,
        categoryName: "Pastries",
        rating: 4.9,
        reviews: 421,
        stock: 80,
        isFeatured: true,
        ingredients: ["Flour", "Butter", "Milk", "Sugar", "Yeast"],
        nutrition: { calories: 280, protein: 6, fat: 15, carbs: 32 }
      },
      {
        name: "Danish Pastry",
        description: "Sweet Danish pastry with fruit filling",
        price: 4.29,
        image: "🥐",
        category: createdCategories[2]._id,
        categoryName: "Pastries",
        rating: 4.7,
        reviews: 267,
        stock: 45
      },
      // Cookies
      {
        name: "Chocolate Chip Cookies",
        description: "Classic chocolate chip cookies (6 pack)",
        price: 8.99,
        image: "🍪",
        category: createdCategories[3]._id,
        categoryName: "Cookies",
        rating: 4.9,
        reviews: 512,
        stock: 100,
        isFeatured: true
      },
      {
        name: "Oatmeal Raisin Cookies",
        description: "Chewy oatmeal cookies with raisins (6 pack)",
        price: 7.99,
        image: "🍪",
        category: createdCategories[3]._id,
        categoryName: "Cookies",
        rating: 4.5,
        reviews: 156,
        stock: 90
      },
      // Donuts
      {
        name: "Glazed Donut",
        description: "Classic glazed donut",
        price: 2.49,
        image: "🍩",
        category: createdCategories[4]._id,
        categoryName: "Donuts",
        rating: 4.8,
        reviews: 389,
        stock: 120
      },
      {
        name: "Chocolate Donut",
        description: "Chocolate frosted donut with sprinkles",
        price: 2.99,
        image: "🍩",
        category: createdCategories[4]._id,
        categoryName: "Donuts",
        rating: 4.7,
        reviews: 312,
        stock: 110
      },
      // Pies
      {
        name: "Apple Pie",
        description: "Classic apple pie with cinnamon",
        price: 18.99,
        image: "🥧",
        category: createdCategories[5]._id,
        categoryName: "Pies",
        rating: 4.8,
        reviews: 267,
        stock: 25
      },
      {
        name: "Pumpkin Pie",
        description: "Seasonal pumpkin pie with spices",
        price: 16.99,
        image: "🥧",
        category: createdCategories[5]._id,
        categoryName: "Pies",
        rating: 4.7,
        reviews: 198,
        stock: 30
      },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@bakerydelight.com',
      phone: '+1234567890',
      password: 'admin123',
      role: 'admin',
      avatar: '👨‍💼',
      isVerified: true
    });
    console.log('✅ Created admin user');

    // Create demo user
    const user = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '+15551234567',
      password: 'user123',
      avatar: '👩',
      isVerified: true,
      rewardPoints: 850,
      tier: 'Gold'
    });
    console.log('✅ Created demo user');

    console.log('\n🎉 Seed data created successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: phone: +1234567890, password: admin123');
    console.log('User: phone: +15551234567, password: user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();


