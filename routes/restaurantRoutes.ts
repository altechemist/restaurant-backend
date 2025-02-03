import { Router } from 'express';
import { addRestaurant, getRestaurants } from '../controllers/restaurantController';

const router = Router();

router.post('/addRestaurant', addRestaurant);  // This should point to a valid function
router.get('/getRestaurant', getRestaurants);    // This should point to a valid function

export default router;
