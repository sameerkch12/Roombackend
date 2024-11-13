import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import fs from 'fs';
import Hotels, { IHotel } from '../models/hotelModel';

cloudinary.v2;

interface HotelRequestBody {
  name: string;
  phone: number;
  price: number;
  room: string;
  address: string;
  wifi: string;
  furnished: string;
  latitude: string;
  longitude: string;
}

interface File {
  path: string;
}

export const createHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      phone,
      price,
      room,
      address,
      wifi,
      furnished,
      latitude,
      longitude,
    } = req.body as HotelRequestBody;
    const images = req.files as Express.Multer.File[] | undefined;

    // Validate required fields
    if (!name || !phone || !address) {
      res.status(400).json({ msg: "Name, phone, and address are required" });
      return;
    }

    // Upload images to Cloudinary
    const uploadedImages = images
      ? await Promise.all(
          images.map(async (file: File) => {
            const result = await cloudinary.v2.uploader.upload(file.path);
            fs.unlink(file.path, (err) => {
              if (err) console.error("Error deleting file:", err);
            });
            return {
              public_id: result.public_id,
              url: result.secure_url,
              secure_url: result.secure_url,
            };
          })
        )
      : [];

    // Create hotel data
    const hotelData: Partial<IHotel> = {
      name,
      phone,
      address,
      price,
      room,
      wifi,
      furnished,
      images: uploadedImages,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    };

    const newHotel = new Hotels(hotelData);
    await newHotel.save();

    res.status(201).json({ msg: "Hotel created successfully", success: true, newHotel });
  } catch (error) {
    console.error("Error creating hotel:", error);
    res.status(500).json({ error: "Internal server error", details: (error as Error).message });
  }
};

export const getAllHotels = async (req: Request, res: Response): Promise<void> => {
  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving hotels', error });
  }
};

// Retrieve a single hotel by phone number
export const getOneHotel = async (req: Request, res: Response): Promise<void> => {
  const { phone } = req.params;
  try {
    const hotel = await Hotels.findOne({ phone });
    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
      return;
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving hotel", error });
  }
};

export const getLocation = async (req: Request, res: Response): Promise<void> => {
  const { latitude, longitude } = req.body;

  if (latitude == null || longitude == null) {
    res.status(400).json({ message: 'Latitude and longitude are required.' });
    return;
  }

  try {
    const newLocation = new Hotels({
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
    });
    await newLocation.save();

    res.json({ message: 'Location saved successfully', data: newLocation });
  } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ message: 'Error saving location', error });
  }
};

// Find nearest rent rooms within a specified distance
export const find_nearest = async (req: Request, res: Response): Promise<void> => {
  const { latitude, longitude, maxDistance = 1000 } = req.body;

  try {
    const rentRooms = await Hotels.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          distanceField: "dist.calculated",
          maxDistance: parseFloat(maxDistance) * 1609, // Convert miles to meters if needed
          spherical: true,
        },
      },
    ]);

    res.status(200).send({
      success: true,
      msg: "Nearby hotels found",
      data: rentRooms,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: (error as Error).message ,
    });
  }
};
