const mongoose = require('mongoose')
const searchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel", 
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  dateSearched: {
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model("SearchHistory", searchHistorySchema);
