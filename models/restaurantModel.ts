import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  cuisine: { type: String, required: true },
  availableSlots: [{ type: Date }],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export { Restaurant };
