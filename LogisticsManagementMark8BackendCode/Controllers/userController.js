const UserManagement = require('../Models/UserManagement')

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserManagement.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};

// POST create a new user
const createUser = async (req, res) => {
  try {
    const { username, type } = req.body;

    if (!username || !type) {
      return res.status(400).json({
        success: false,
        message: "username and type are required",
      });
    }

    const newUser = new UserManagement({ username, type });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
