const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtils = require("../utils/MailUtils");
const jwt = require("jsonwebtoken");
const secret = "gecBhavnagar";

const signup = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ message: "Password is required" });
    }
    console.log("password", req.body.password);

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

    if (!findUserByEmail) {
      return res.status(404).json({ message: "Email not found" });
    }

    // 🔹 Use async bcrypt.compare()
    const isMatch = await bcrypt.compare(password, findUserByEmail.password);
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

const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email }).lean();
  console.log(foundUser);

  if (!foundUser) {
    return res.status(404).json({ message: "Email not registered..." });
  }
  const token = jwt.sign(foundUser, secret);
  console.log(token);

  const url = `http://localhost:5173/resetpassword/${token}`;
  const mailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Password Reset</title>
      </head>
      <body>
        <h1>Your Password Reset Link</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${url}" style="display:inline-block; padding:10px 20px; background:#007BFF; color:#fff; text-decoration:none; border-radius:5px;">
          Reset Password
        </a>
      </body>
    </html>`;
  await mailUtils.sendingMail(foundUser.email, "Reset Password", mailContent);
  res.json({
    message: "Reset Password link sent to mail",
  });
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(newPassword);

    const userFromToken = jwt.verify(token, secret);
    if (!userFromToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.log("user fetched", userFromToken);

    const salt = await bcrypt.genSalt(10); // 🔹 Async Salt Generation
    const hashedPassword = await bcrypt.hash(newPassword, salt); // 🔹 Async Hashing

    const updatedUser = await userModel.findByIdAndUpdate(
      userFromToken._id,
      { password: hashedPassword },
      { new: true }
    );
    console.log("user updated successfully", updatedUser);

    res.status(201).json({ message: "Password updated successfully..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Can't reset password...", error });
  }
};

const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleID");

  res.json({
    message: "All users fetched...",
    data: users,
  });
};
const updateUserDetails = async (req, res) => {
  try {
    const { Restaurant, firstName, lastName, bio, city, area } = req.body;
    const { userId } = req.params;
    let profilePic = req.file ? req.file.path : undefined;

    const updatedUserDetails = await userModel.findByIdAndUpdate(
      userId,
      {
        Restaurant,
        firstName,
        lastName,
        bio,
        city,
        area,
        profilePic: profilePic || undefined,
      },
      { new: true }
    );
    if (!updatedUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "profile updated Successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

// const updateRestroOwnerDetails = async (req, res) => {
//   try {
//     const { firstName, lastName, city, bio, Restaurant, area } = req.body;
//     const { userId } = req.params;

//     let profilePicPath = req.file ? req.file.path : undefined;

//     const updatedUserDetails = await userModel.findByIdAndUpdate(
//       userId,
//       {
//         firstName,
//         lastName,
//         city,
//         bio,
//         Restaurant,
//         area,
//         profilePicPath: profilePic || undefined
//       },
//       { new: true }
//     );

//     console.log(updatedUserDetails);

//     if (!updatedUserDetails) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "Profile updated successfully",
//       data: updatedUserDetails,
//     });
//   } catch (error) {
//     console.error("Update Error:", error);
//     res.status(500).json({ message: "error occured" });
//   }
// };

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
  forgotPassword,
  resetPassword,
  updateUserDetails,
  // updateRestroOwnerDetails,
};
