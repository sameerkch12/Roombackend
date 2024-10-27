import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import hotels from '../models/hotelModel';

// Define an interface for hotel data
interface HotelData {
  name: string;
  email: string;
  phone: number;
  password: string;
  address: string;
  price: number;
  room: string;
  wifi: string;
  furnished: string;
  images: Array<{
    public_id: string;
    url: string;
    secure_url: string;
  }>;
}

// Create hotel function
const createHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      phone,
      price,
      room,
      address,
      wifi,
      furnished,
    } = req.body;
    const images = req.files as Express.Multer.File[]; // Type assertion for req.files

    // Validate required fields
    if (!name || !email || !password || !phone || !address || !images || images.length === 0) {
       res.status(400).json({ success: false, message: "Required fields missing or no files uploaded." });
       return
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload images to Cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.path);
          fs.unlink(file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
          return {
            public_id: result.public_id,
            url: result.url,
            secure_url: result.secure_url,
          };
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw error;
        }
      })
    );

    // Prepare hotel data
    const hotelData: HotelData = {
      name,
      email,
      phone: parseInt(phone),
      password: hashedPassword,
      address,
      price: parseFloat(price),
      room,
      wifi,
      furnished,
      images: uploadedImages,
    };

    const newHotelData = new hotels(hotelData);
    await newHotelData.save();

    res.status(201).json({
      msg: "Hotel created successfully",
      success: true,
      newHotelData,
    });
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get hotels function
const getHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    
  } catch (error) {
    
  }
};

export { createHotel, getHotels };
