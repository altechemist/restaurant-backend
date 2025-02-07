import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  restaurant_name: {type: String, required: true},
  fullName: {type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: {type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  numberOfPeople: { type: Number, required: true },
  specialRequests: { type: String, }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

export { Reservation };
