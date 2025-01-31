import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurantModel';

export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ message: 'Error adding restaurant' });
  }
};
