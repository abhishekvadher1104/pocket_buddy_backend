const wishSchema = require("../models/WishListModels");


const checkWishlistStatus = async (req, res) => {
  try {
    const { userId, offerId } = req.params;

    const wishItem = await wishSchema.findOne({ userId, offerId });

    if (wishItem) {
      return res
        .status(200)
        .json({ message: "Offer is in the wishlist", isWishlisted: true });
    } else {
      return res
        .status(200)
        .json({ message: "Offer is not in the wishlist", isWishlisted: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const addToWishList = async (req, res) => {
  try {
    const { offerId, userId } = req.params;

    const exist = await wishSchema.findOne({
      userId,
      offerId,
    });
    if (exist) {
      return res.status(400).json({ message: "already in wishlist" });
    }
    const wishItem = await wishSchema.create({ userId, offerId });
    res.status(201).json({
      message: "added to wishlist",
      data: wishItem,
    });
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { offerId, userId } = req.params;

    const removed = await wishSchema.findOneAndDelete({ userId, offerId });
    if (!removed) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getWishList = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishData = await wishSchema
      .find({ userId })
      .populate("offerId")
      .sort({ createdAt: -1 });
    res.status(200).json({
      data: wishData,
      message: "data found successfully...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal error",
    });
  }
};

module.exports = {
  addToWishList,
  removeFromWishlist,
  getWishList,
  checkWishlistStatus
};
