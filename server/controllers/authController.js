import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to create the "key" (token)
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Admin stays logged in for 30 days
  });
};


// @desc    Register a new admin
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user (Password hashing happens automatically in User model middleware)
  const user = await User.create({
    name,
    email,
    password,
    isAdmin: true // For this specific project, we default to Admin
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};


// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  // Check if user exists AND password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // Send the token to the frontend
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};