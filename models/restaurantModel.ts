import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  availableSlots: [{ type: Date }],
  rating: { type: Number, min: 1, max: 5 },
  reviews: { type: Number, required: true },
  image: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin reference
  menuItems: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true }, // You can store price as a number (e.g., float)
      category: { type: String }, // Optional category (e.g., appetizer, main, dessert)
      image: { type: String }, // Optional image URL for the menu item
      ingredients: { type: [String] }, // Optional array of ingredients
      available: { type: Boolean, default: true } // Indicate if the item is available
    }
  ]
});


const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export { Restaurant };