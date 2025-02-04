import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurantModel';

// Fetch all restaurants
export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch specific restaurant by ID
export const getRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    
    if (!restaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update restaurant by ID
export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!updatedRestaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ message: 'Error updating restaurant' });
  }
};

// Remove restaurant by ID
export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      res.status(404).json({ message: 'Restaurant not found' });
      return;
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new restaurant
export const addRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ message: 'Error adding restaurant' });
  }
};
