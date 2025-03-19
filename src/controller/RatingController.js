const ratingsSchema = require("../models/RatingModels");

const addRatings = async (req, res) => {
  const { ratings, userId, restroId } = req.body;
  console.log("received ",req.body.ratings);
  
  try {
    const existingRating = await ratingsSchema.findOne({ userId, restroId });
    if (existingRating)
      return res
        .status(400)
        .json({ message: "You have already rated this restaurant." });

    const newRating = await ratingsSchema.create({ ratings, userId, restroId });

    res.status(201).json({
      message: "rating added",
      data: newRating,
    });
    console.log(ratings);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
const getAllRestroRating = async (req, res) => {
  try {
    const ratings = await ratingsSchema.find().populate("userId");
    res.status(200).json({
      message: "ratings of all restaurant",
      data: ratings,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getRatingsByRestroId = async (req, res) => {
  const { ratings, userId, restroId } = req.body;
  try {
    const existingRating = await ratingsSchema.findOne({ userId, restroId });
    if (existingRating)
      return res
        .status(400)
        .json({ message: "You have already rated this restaurant." });

    const newRating = await ratingsSchema.create({ ratings, userId, restroId });

    res.status(201).json({
      message: "rating added",
      data: newRating,
    });
    console.log(ratings);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addRatings,
  getRatingsByRestroId,
  getAllRestroRating,
};
