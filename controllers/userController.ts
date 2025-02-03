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
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    console.log("🔍 Checking if user exists...");
    const existingUser = await User.findOne({ email });
    console.log("Existing user found:", existingUser);

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("📝 Creating new user...");
    const user = await User.create({ name, email, password: hashedPassword });

    console.log("✅ User created:", user);

    const token = generateToken(user._id as unknown as string);
    res.status(201).json({ message: "User registered successfully", token });

  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log the start of the login process
    console.log("🔍 Login attempt...");

    const { email, password } = req.body;

    // Check for missing fields and log it
    if (!email || !password) {
      console.log("❌ Missing email or password");
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    // Log the search for the user
    console.log(`🔍 Searching for user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Log password comparison
    console.log("🔐 Comparing password...");
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(`❌ Incorrect password for user ${email}`);
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Log successful login
    console.log(`✅ User ${email} logged in successfully`);

    // Generate token and send response
    const token = generateToken(user._id as unknown as string);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('❌ Login error:', error); // Add error logging
    res.status(500).json({ error: 'Server error' });
  }
};

