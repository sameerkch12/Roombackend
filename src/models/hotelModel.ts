import mongoose, { Document, Schema } from "mongoose";

// Define interface for hotel images
interface IImage {
  public_id: string;
  url: string;
  secure_url: string;
}

// Define interface for hotel location
interface ILocation {
  type: "Point";
  coordinates: [number, number];
  timestamp?: Date;
}

// Define interface for hotel document
export interface IHotel extends Document {
  name: string;
  phone: number;
  address: string;
  price: number;
  room: string;
  wifi?: string;
  furnished?: string;
  images: IImage[];
  location: ILocation;
}

// Define the schema for hotels
const hotelSchema = new Schema<IHotel>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
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
    default: "No",
  },
  furnished: {
    type: String,
    default: "No",
  },
  images: [
    {
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
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
});

// Create a geospatial index on the location field
hotelSchema.index({ location: "2dsphere" });

// Create and export the model
const Hotels = mongoose.model<IHotel>("Hotels", hotelSchema);
export default Hotels;
