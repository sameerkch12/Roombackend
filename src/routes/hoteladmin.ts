import express, { Router } from "express";
import { createHotel, getHotels } from "../controllers/hoteladmin";
import upload from "../config/uploadConfig";

const router: Router = express.Router();

// Route for creating a hotel with image upload (max 5 images)
router.post('/create', upload.array('images', 5), createHotel);

// Route for getting all hotels
router.get('/', getHotels);

export default router;
