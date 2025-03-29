const multer = require("multer");
const profileSchema = require("../models/ProfileModels");
const cloudinaryUtil = require("../utils/CloudinaryUtils");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

const addProfileDetails = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    }
    try {
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );

      console.log(cloudinaryResponse);
      console.log(req.body);
      const { firstName, lastName, email, image, bio, city, role, userId } =
        req.body;

      const profileData = {
        firstName,
        lastName,
        email,
        image: cloudinaryResponse.secure_url,
        bio,
        city,
        role,
        userId,
      };

      const savedProfile = await profileSchema.create(profileData);

      res.status(200).json({
        message: "Profile saved successfully",
        data: savedProfile,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error saving profile",
        error: error.message,
      });
    }
  });
};

const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, city, bio } = req.body;
    let updateData = { firstName, lastName, city, bio };

    if (req.file) {
      updateData.profilePic = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        updateData,
        { new: true }
      );
      if (!updateUser) {
        res.status(404).json({ success: false, message: "User Not found" });
      }
      res
        .status(200)
        .json({
          success: true.valueOf,
          message: "profile updates successfully",
        });
    }
  } catch (error) {
    console.error("error updating profile:", error);
    res.status(500).json({success:false,message:"error updating profile"})
  }
};

const getProfileByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const profileData = await profileSchema
      .findOne({ userId })
      .populate("userId");
    res.status(200).json({
      message: "profile fetched successfully",
      data: profileData,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addProfileDetails,
  getProfileByUserId,
  updateProfile
};
