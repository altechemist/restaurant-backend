import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  availableSlots: [{ type: Date }],
  rating: { type: Number, min: 1, max: 5 },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export { Restaurant };
