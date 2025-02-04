import { Router } from 'express';
import { 
  addRestaurant, 
  getRestaurants, 
  getRestaurant, 
  updateRestaurant, 
  deleteRestaurant 
} from '../controllers/restaurantController';

const router = Router();

// Add a new restaurant
router.post('/', addRestaurant);

// Get all restaurants
router.get('/', getRestaurants);

// Get a specific restaurant by ID
router.get('/:id', getRestaurant);

// Update a restaurant
router.put('/:id', updateRestaurant);

// Delete a restaurant
router.delete('/:id', deleteRestaurant);

export default router;
