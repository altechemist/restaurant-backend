import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // In a real app, hash passwords
});

const User = mongoose.model('User', userSchema);

export { User };
