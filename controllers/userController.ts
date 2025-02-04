import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel';
import generateToken from '../utils/generateToken';

/**
 * @desc Register a new user
 * @route POST /api/users/register
 * @access Public
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id.toString());
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

/**
 * @desc Authenticate user & get token
 * @route POST /api/users/login
 * @access Public
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user._id.toString());
    res.json({ message: "Login successful", token, user });
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

/**
 * @desc Get all users
 * @route GET /api/users
 * @access Private (Admin Only)
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select('-password'); // Exclude password field
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

/**
 * @desc Get a single user
 * @route GET /api/users/:id
 * @access Private
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

/**
 * @desc Update user profile (Name & Email)
 * @route PUT /api/users/:id
 * @access Private
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    const updatedUser = await user.save();
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

/**
 * @desc Update user password
 * @route PUT /api/users/:id/password
 * @access Private
 */
export const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Incorrect old password" });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

/**
 * @desc Delete user account
 * @route DELETE /api/users/:id
 * @access Private (Admin or User)
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
