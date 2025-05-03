const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
  offerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"offer",
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"userModel",
    required:true
  }
},{
  timestamps:true
})
module.exports = mongoose.model('wishList',wishListSchema);