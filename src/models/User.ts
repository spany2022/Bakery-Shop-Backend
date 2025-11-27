// import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   password?: string;
//   avatar: string;
//   role: 'user' | 'admin';
//   isVerified: boolean;
//   rewardPoints: number;
//   tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
//   createdAt: Date;
//   updatedAt: Date;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUser>({
//   name: {
//     type: String,
//     required: [true, 'Please provide a name'],
//     trim: true
//   },
//   email: {
//     type: String,
//     required: [true, 'Please provide an email'],
//     unique: true,
//     lowercase: true,
//     trim: true,
//     match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
//   },
//   phone: {
//     type: String,
//     required: [true, 'Please provide a phone number'],
//     unique: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     minlength: [6, 'Password must be at least 6 characters'],
//     select: false
//   },
//   avatar: {
//     type: String,
//     default: '👤'
//   },
//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   },
//   isVerified: {
//     type: Boolean,
//     default: false
//   },
//   rewardPoints: {
//     type: Number,
//     default: 0
//   },
//   tier: {
//     type: String,
//     enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
//     default: 'Bronze'
//   }
// }, {
//   timestamps: true
// });

// // Hash password before saving
// userSchema.pre('save', async function(next) {
//   if (!this.isModified('password') || !this.password) {
//     return next();
//   }
  
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
//   if (!this.password) return false;
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model<IUser>('User', userSchema);







// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'user' | 'admin';
  isVerified: boolean;
  rewardPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true,
      // You can add unique + validation later if you want email to be strict
      // match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    avatar: {
      type: String,
      default: '👤',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    rewardPoints: {
      type: Number,
      default: 0,
    },
    tier: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
      default: 'Bronze',
    },
  },
  {
    timestamps: true,
  }
);

// No password, no hashing, no comparePassword

export default mongoose.model<IUser>('User', userSchema);
