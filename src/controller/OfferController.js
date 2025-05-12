const offerSchema = require("../models/OfferModels");

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
    const offersfetched = await offerSchema.find();
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
const getOfferByOfferId = async (req, res) => {
  try {
    const offers = await offerSchema.findById(req.params.id).populate("userId");
    res.status(200).json({
      message: "restaurant found",
      data: offers,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
const addOfferWithFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log(req.file);

    const {
      offer,
      description,
      startDate,
      endDate,
      latitude,
      longitude,
      foodType,
      userId,
    } = req.body;
    let imageURL = req.file ? req.file.path : undefined;
    const addOffer = await offerSchema.create({
      offer,
      description,
      startDate,
      endDate,
      latitude,
      longitude,
      foodType,
      imageURL: imageURL || undefined,
      userId,
    });
    res.status(200).json({
      message: "Offer added successfully",
      data: addOffer,
    });
  } catch (error) {
    console.error("Error adding offer:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const updateOfferWithFile = async (req, res) => {
  try {
    const { id } = req.params; 

    const {
      offer,
      description,
      startDate,
      endDate,
      latitude,
      longitude,
      foodType,
    } = req.body;

    let imageURL = req.file ? req.file.path : undefined;

    const updateData = {
      offer,
      description,
      startDate,
      endDate,
      latitude,
      longitude,
      foodType,
    };

    if (imageURL) {
      updateData.imageURL = imageURL;
    }

    const updatedOffer = await offerSchema.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    res.status(200).json({
      message: "Offer updated successfully",
      data: updatedOffer,
    });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOffer = await offerSchema.findByIdAndDelete(id);
    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({
      message: "Offer deleted successfully",
      data: deletedOffer,
    });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ...existing code...

module.exports = {
  addOffer,
  getAllOffers,
  addOfferWithFile,
  getAllOffersByUserId,
  getOfferByOfferId,
  updateOfferWithFile,
  deleteOffer 
};
