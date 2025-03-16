const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtils = require("../utils/MailUtils");


const signup = async (req, res) => {
  try {
    const hassedpassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hassedpassword;
    const newUser = await userModel.create(req.body);

    await mailUtils.sendingMail(
      newUser.email,
      "welcome mail from pocketBuddy",
      "Successfully registered at pocket buddy..."
    );
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
    const password = req.body.password;
    const email = req.body.email;


    const findUserByEmail = await userModel.findOne({ email: email });
    console.log(findUserByEmail);
    if (findUserByEmail != null) {
      const isMatch = bcrypt.compareSync(password, findUserByEmail.password);
      


      if (isMatch == true) {
        res.status(200).json({
          message: "Login Successfully..",
          data: findUserByEmail,
        });
      } else {
        res.status(404).json({
          message: "Invalid credentials...",
        });
      }
    } else {
      res.status(404).json({
        message: "Email not found",
      });
    }
  } catch (err) {
    console.log(err);
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
