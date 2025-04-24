const SearchHistory = require("../models/HistoryModels");

const addHistory = async (req, res) => {
  const { userId, query } = req.body;
  try {
    const history = await SearchHistory.create({ userId, query });
    res.status(201).json({
      data: history,
      message: "history added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error in server...",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find({
      userId: req.params.userId,
    }).sort({ dateSearched: -1 });
    res.status(200).json({
      data: history,
      message: "history fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error in fetching history",
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const deletedhistory = await SearchHistory.findByIdAndDelete(req.params.id);
    res.status(200).json({
      data: deletedhistory,
      message: "history deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error in fetching history",
    });
  }
};
const deleteAll = async (req, res) => {
  try {
    const deleted = await SearchHistory.deleteMany({
      userId: req.params.userId,
    });
    res.status(200).json({
      message: "deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "error in delete history",
    });
  }
};

module.exports = {
  addHistory,
  getHistory,
  deleteHistory,
  deleteAll,
};
