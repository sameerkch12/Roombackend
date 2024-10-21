import Hotel, { IHotel } from "../models/hotelModel"; // Import the Hotel model and the IHotel interface
import { Document } from "mongoose";

class HotelService {
  // Define the type of hotelData based on the IHotel interface
  static async createHotel(hotelData: Omit<IHotel, '_id' | 'createdAt'>): Promise<IHotel> {
    try {
      const newHotel = new Hotel(hotelData); // Create a new hotel instance
      await newHotel.save(); // Save the new hotel to the database
      return newHotel; // Return the saved hotel
    } catch (error: any) {
      // Provide detailed error message
      console.error("Error creating Hotel:", error);
      throw new Error("Error creating Hotel: " + error.message); // Include the actual error message for better debugging
    }
  }

  // Add the findOne method to find hotels by email
  static async findOneByEmail(email: string): Promise<IHotel | null> {
    try {
      const hotel = await Hotel.findOne({ email }).exec(); // Find a hotel by email
      return hotel; // Return the found hotel (or null if none is found)
    } catch (error: any) {
      console.error("Error finding hotel by email:", error);
      throw new Error("Error finding hotel: " + error.message);
    }
  }

  // Fetch all hotels
  static async getAllHotels(): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find().exec(); // Fetch all hotels from the database
      return hotels; // Return all hotels
    } catch (error: any) {
      console.error("Error fetching hotels:", error);
      throw new Error("Error fetching hotels: " + error.message);
    }
  }
}

export default HotelService;
