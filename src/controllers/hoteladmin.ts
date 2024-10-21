import { Request, Response } from 'express';
import hotelService from '../services/hotelService';
import { IHotel } from '../models/hotelModel'; // Adjust this import as necessary

interface Image {
    filename: string;
    path: string;
}

// Update HotelData to include necessary properties
type HotelData = Omit<IHotel, "_id" | "createdAt">; // Ensure this includes all required properties except the omitted ones

export const createHotel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, phone, price, room, address, wifi, furnished } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phone || !address) {
            res.status(400).send({ msg: "All fields are required" });
            return;
        }

        // Check if a hotel with the same email already exists
        const existingUser = await hotelService.findOneByEmail(email);
        if (existingUser) {
            res.status(400).send({
                msg: 'Hotel with this email already exists',
                success: false
            });
            return;
        }

        // Type assertion for req.files
        const files = req.files as Express.Multer.File[] | undefined;

        // Prepare array of image paths if multiple images are uploaded
        const image: Image[] = files?.map((file) => ({
            filename: file.filename,
            path: file.path
        })) || []; // Fallback to an empty array if files is undefined

        // Prepare hotel data using the updated HotelData type
        const hotelData: HotelData = {
            name,
            email,
            phone,
            password,
            address,
            price,
            room,
            wifi,
            furnished,
            image // Ensure this matches the structure of IHotel
        } as HotelData; // Explicitly assert the type

        // Create a new hotel using the service
        const newHotel = await hotelService.createHotel(hotelData);

        // Respond with success message and hotel data
        res.status(201).send({
            msg: "Hotel created successfully",
            success: true,
            newHotel
        });
    } catch (error) {
        console.error("Error creating hotel:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getHotels = async (req: Request, res: Response): Promise<void> => {
    try {
        // Fetch all hotels from the service
        const hotels = await hotelService.getAllHotels();

        // Respond with the list of hotels
        res.status(200).json({ success: true, data: hotels });
    } catch (error) {
        console.error("Error fetching hotels:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
