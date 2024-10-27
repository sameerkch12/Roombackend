import mongoose, { Schema, Document } from 'mongoose';

// Interface for Images
interface Image {
  public_id: string;
  url: string;
  secure_url: string;
}

// Interface for Hotel Document
export interface IHotel extends Document {
  name: string;
  email: string;
  phone: number;
  password: string;
  address: string;
  price: number;
  room: string;
  wifi?: string;
  furnished?: string;
  images: Image[];
  createdAt: Date;
}

// Hotel Schema
const hotelSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "phone number is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  wifi: {
    type: String,
    default: 'No',
  },
  furnished: {
    type: String,
    default: 'No',
  },
  images: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the Mongoose model
const HotelModel = mongoose.model<IHotel>("Hotel", hotelSchema);
export default HotelModel;
