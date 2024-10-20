import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Hotel schema
interface IHotel extends Document {
    name: string;
    email: string;
    phone: number;
    password: string;
    address: string;
    price: number;
    room: string;
    wifi: string;
    furnished: string;
    image: { filename: string; path: string }[];
    createdAt: Date;
}

// Create a Schema corresponding to the document interface
const hotelSchema: Schema<IHotel> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true, // Ensure unique email
    },
    phone: {
        type: Number,
        required: [true, "phone number is required"],
        unique: true, // Ensure unique phone no
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
        required: true
    },
    room: {
        type: String,
        required: true
    },
    wifi: {
        type: String,
        default: 'No',
    },
    furnished: {
        type: String,
        default: 'No',
    },
    image: [{
        filename: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create and export the Mongoose model
const Hotel = mongoose.model<IHotel>("Hotel", hotelSchema);

export default Hotel;
