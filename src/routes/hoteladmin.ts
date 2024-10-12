import { Router } from 'express';
import { HotelAdminDetails } from '../controllers/hoteladmin';


const router = Router();
//api  = /api/hoteladmin/details
router.post('/details', HotelAdminDetails);

export default router;
