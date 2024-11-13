import express, { Request, Response } from "express";
import { createHotel, getAllHotels, getOneHotel, getLocation, find_nearest } from "../controllers/hoteladmin";
import upload from "../middlewares/multer";

const hotelRoute = express.Router();

// Create a new hotel with image uploads
hotelRoute.post('/create', upload.array('images', 5), (req: Request, res: Response) => {
    createHotel(req, res);
});  // http://localhost:3000/api/hoteladmin/create

// Endpoint to save location data
hotelRoute.post('/get-location', (req: Request, res: Response) => {
    getLocation(req, res);
});  // http://localhost:3000/api/hoteladmin/get-location

// Retrieve all hotels
hotelRoute.get('/hotels', (req: Request, res: Response) => {
    getAllHotels(req, res);
});  // http://localhost:3000/api/hoteladmin/hotels

// Retrieve one hotel by email
hotelRoute.get('/:phone', (req: Request, res: Response) => {
    getOneHotel(req, res);
});  // http://localhost:3000/api/hoteladmin/:email

// Find nearest hotels based on location
hotelRoute.post('/find-nearest', (req: Request, res: Response) => {
    find_nearest(req, res);
});  // http://localhost:3000/api/hoteladmin/find-nearest

export default hotelRoute;
