import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const addressSchema = new Schema<IAddress>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: [true, 'Please provide address type'],
    enum: ['Home', 'Work', 'Other']
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Please provide state'],
    trim: true
  },
  zipCode: {
    type: String,
    required: [true, 'Please provide zip code'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please provide country'],
    default: 'USA',
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Ensure only one default address per user
addressSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await mongoose.model('Address').updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

export default mongoose.model<IAddress>('Address', addressSchema);


