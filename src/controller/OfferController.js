const offerSchema = require("../models/OfferModels");
const cloudinaryUtil = require("../utils/CloudinaryUtils");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

const addOffer = async (req, res) => {
  try {
    const savedOffer = await offerSchema.create(req.body);

    res.status(201).json({
      message: "offer added successfully",
      data: savedOffer,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getAllOffers = async (req, res) => {
  try {
    const offersfetched = await offerSchema
      .find()
      .populate("stateId cityId areaId");

    res.status(200).json({
      message: "all offers fetched...",
      data: offersfetched,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getAllOffersByUserId = async (req, res) => {
  try {
    console.log("User ID:", req.params.userId);
    const offers = await offerSchema.find({ userId: req.params.userId });
    res.status(200).json({
      message: "offers found...",
      data: offers,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
const getOfferByOfferId = async(req,res) =>{
  try {
    const offers = await offerSchema.findById(req.params.id)
    res.status(200).json({
      message:"restaurant found",
      data:offers
    })
  } catch (error) {
    res.status(500).json({
      message:error
    })
  }
}
const addOfferWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log(cloudinaryResponse);
      console.log(req.body);

      req.body.imageURL = cloudinaryResponse.secure_url;
      const savedofferImage = await offerSchema.create(req.body);

      res.status(200).json({
        message: "hording saved successfully",
        data: savedofferImage,
      });
    }
  });
};

const topRatedRestro = async (req, res) => {
  const topRestro = await offerSchema.find();
};

module.exports = {
  addOffer,
  getAllOffers,
  addOfferWithFile,
  getAllOffersByUserId,
  getOfferByOfferId
};
