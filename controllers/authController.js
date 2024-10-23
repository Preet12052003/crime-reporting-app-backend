const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validateAadhaar = require('../utils/aadharValidator')
// const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  // Registration logic
  const { email, password, aadhaarNumber } = req.body;
  console.log('email', email);
  
  try {

    // Validate Aadhaar number
    if (!validateAadhaar(aadhaarNumber)) {
      return res.status(400).json({ message: 'Invalid Aadhaar number' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { aadhaarNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or Aadhaar number already in use' });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      aadhar: aadhaarNumber
    });

    await newUser.save();

    // Generate JWT
    // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json( { id: newUser._id, email: newUser.email } );
  } catch (error) {
    res.status(500).json({ message: 'Error in registration', error: error.message });
  }
};

exports.login = async (req, res) => {
  // Login logic
  try {
    const { email, aadhaarNumber, password } = req.body;

    // Validate Aadhaar number
    if (!validateAadhaar(aadhaarNumber)) {
      return res.status(400).json({ message: 'Invalid Aadhaar number' });
    }

    // Find user by Aadhaar number
    const user = await User.findOne({ aadhar: aadhaarNumber });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ id: user._id, email: user.email } );
  } catch (error) {
    res.status(500).json({ message: 'Error in login', error: error.message });
  }
};
