const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtils = require("../utils/MailUtils");

const signup = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const newUser = await userModel.create(req.body);

    try {
      await mailUtils.sendingMail(
        newUser.email,
        "Welcome mail from PocketBuddy",
        "Successfully registered at PocketBuddy..."
      );
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }
    res.status(201).json({
      message: "user created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "error",
      data: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUserByEmail = await userModel.findOne({ email });
    console.log(findUserByEmail); // Fixed syntax error

    if (!findUserByEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isMatch = bcrypt.compareSync(password, findUserByEmail.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials..." });
    }

    res.status(200).json({
      message: "Login Successfully..",
      data: findUserByEmail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleID");

  res.json({
    message: "All users fetched...",
    data: users,
  });
};

const addUser = async (req, res) => {
  const user = await userModel.create(req.body);

  res.json({
    message: "User saved successfully...",
    data: user,
  });
};

const deleteUser = async (req, res) => {
  const deleted = await userModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted succefully",
    data: deleted,
  });
};

const findUserByID = async (req, res) => {
  const getUserByID = await userModel.findById(req.params.id);

  res.json({
    message: "user fetched successfully...",
    data: getUserByID,
  });
};

module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  findUserByID,
  signup,
  login,
};
