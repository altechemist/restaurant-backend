import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
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
