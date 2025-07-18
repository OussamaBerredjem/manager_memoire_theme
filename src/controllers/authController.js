// src/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Create a JWT token

    console.log(user.typeUtilisateur);

    const isAdmin = await Admin.findOne({ where: { userId: user.id } });

    console.log(isAdmin!=null);
    
    const token = jwt.sign({ id: user.id, role: user.typeUtilisateur ,isAdmin : isAdmin!=null}, process.env.JWT_SECRET, {
      expiresIn: '3h', // Token expires in 1 hour
    });

    // Send the token and user role
    res.json({ token});
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
