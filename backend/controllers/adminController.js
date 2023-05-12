const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

// @desc    register Admin
// @route   POST /api/admin
// @access  Private
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, isSuper } = req.body;
  if (!name || !email || !password || !isSuper) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //Check if admin exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  //Hash pass
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
    isSuper,
  });

  if (admin) {
    res.status(201).json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      isSuper: admin.isSuper,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Admin Data");
  }
});

// @desc    authenticate an admin
// @route   POST /api/admin/login
// @access  Private
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for admin email
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      isSuper: admin.isSuper,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    get admin data
// @route   GET /api/admin/me
// @access  Private
const getAdmin = asyncHandler(async (req, res) => {
  const { _id, name, email, isSuper } = await Admin.findById(req.admin.id); //req.admin.id jeye mn l auth midlleware
  res.status(200).json({
    id: _id,
    name,
    email,
    isSuper,
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmin,
};
