import mongoose, { Document, Schema } from 'mongoose';

export interface IFavourite extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const favouriteSchema = new Schema<IFavourite>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

export default mongoose.model<IFavourite>('Favourite', favouriteSchema);


