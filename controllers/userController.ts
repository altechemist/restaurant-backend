import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel';
import generateToken from '../utils/generateToken';
import { connectToDB } from '../config/mongodb';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await connectToDB();

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id as string);
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error); // Add logging here
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await connectToDB();

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user._id as string);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error); // Add logging here
    res.status(500).json({ error: 'Server error' });
  }
};
