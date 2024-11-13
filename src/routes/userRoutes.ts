import express, { Request, Response } from "express";
import { createHotel, getAllHotels, getOneHotel, getLocation, find_nearest } from "../controllers/hoteladmin";
import upload from "../middlewares/multer";

const hotelRoute = express.Router();

// Create a new hotel with image uploads
hotelRoute.post('/create', upload.array('images', 5), (req: Request, res: Response) => {
    createHotel(req, res);
});  // http://localhost:8000/api/v1/hotels/create

// Endpoint to save location data
hotelRoute.post('/get-location', (req: Request, res: Response) => {
    getLocation(req, res);
});  // http://localhost:8000/api/v1/hotels/get-location

// Retrieve all hotels
hotelRoute.get('/hotels', (req: Request, res: Response) => {
    getAllHotels(req, res);
});  // http://localhost:8000/api/v1/hotels/hotels

// Retrieve one hotel by email
hotelRoute.get('/:email', (req: Request, res: Response) => {
    getOneHotel(req, res);
});  // http://localhost:8000/api/v1/hotels/:email

// Find nearest hotels based on location
hotelRoute.post('/find-nearest', (req: Request, res: Response) => {
    find_nearest(req, res);
});  // http://localhost:8000/api/v1/hotels/find-nearest

export default hotelRoute;
