const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    console.log(existingUser)
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.createUser(email, hashedPassword);

    return res.status(201).json({
      message: 'User registered successfully',
      user,
    });

  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await userModel.findUserByEmail(email);

    // SAME RESPONSE for wrong email or password
    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // 2. Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }

    // 3. Generate JWT (user identifier ONLY)
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 4. Return token only
    return res.status(200).json({
      token,
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};


module.exports = { register, login };
