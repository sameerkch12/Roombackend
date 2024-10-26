import express, { Router } from "express";
import { createHotel, getHotels } from "../controllers/hotelController";
import upload from "../middlewares/multer";

const router: Router = express.Router();

// Route for creating a hotel with image upload (max 5 images)
router.post('/create', upload.array('images', 5), createHotel); //http:localhost:3000/api/hoteladmin/create

// Route for getting all hotels
router.get('/', getHotels);

export default router;
