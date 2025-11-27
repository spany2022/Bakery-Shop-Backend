import mongoose, { Schema, Document } from "mongoose";

export interface IOtp extends Document {
  otpId: string;
  phone: string;
  otp: string;
  expiresAt: Date;
}

const otpSchema = new Schema<IOtp>({
  otpId: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, expires: 120 } // auto delete after 120s
});

export default mongoose.model<IOtp>("Otp", otpSchema);
