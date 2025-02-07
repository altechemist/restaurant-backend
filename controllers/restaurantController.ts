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

// Update restaurant by ID (Including Menu Items)
export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // If menuItems are included in the update, handle them separately
    if (updatedData.menuItems) {
      updatedData.menuItems.forEach((item: any) => {
        if (!item.name || !item.description || !item.price) {
          return res.status(400).json({ message: 'Menu item must have a name, description, and price' });
        }
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

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

// Add new restaurant (including menuItems)
export const addRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, address, cuisine, menuItems } = req.body;

    // Check that required fields are provided
    if (!name || !description || !address || !cuisine || !menuItems) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    // Ensure all menuItems are valid
    menuItems.forEach((item: any) => {
      if (!item.name || !item.description || !item.price) {
        return res.status(400).json({ message: 'Menu item must have a name, description, and price' });
      }
    });

    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ message: 'Error adding restaurant' });
  }
};
