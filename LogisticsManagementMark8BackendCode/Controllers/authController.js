const Auth = require('../Models/Auth'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signupMethod = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    
    const existingUser = await Auth.findOne({ email, role });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this role" });
    }

    const user = new Auth({ name, email, password, role });
    await user.save();

    const token = user.generateAuthToken();
    res.status(201).json({ message: "Signup successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


const loginMethod = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await Auth.findOne({ email, role });
    if (!user) return res.status(404).json({ message: "User not found" });

    
    if (user.googleId) {
      return res.status(400).json({ message: "Use Google login instead" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = user.generateAuthToken();
    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


const changePasswordMethod = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; 

    const user = await Auth.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.googleId) {
      return res.status(400).json({ message: "Google users cannot change password" });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(401).json({ message: "Old password incorrect" });

    user.password = newPassword; 
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Change password failed", error: err.message });
  }
};


const googleAuthMethod = async (req, res) => {
  try {
    const { googleId, name, email, picture, role } = req.body;

    let user = await Auth.findOne({ googleId, role });

    if (!user) {
     
      user = new Auth({
        googleId,
        name,
        email,
        picture,
        role,
      });
      await user.save();
    }

    const token = user.generateAuthToken();
    res.json({ message: "Google authentication successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Google auth failed", error: err.message });
  }
};

module.exports={loginMethod,signupMethod,changePasswordMethod,googleAuthMethod}
