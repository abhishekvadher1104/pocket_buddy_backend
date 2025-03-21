const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
  role:{
    enum:["user","restaurant_owner"],
    type:String,
    required:true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  }
});

module.exports = mongoose.model("userModel", userSchema);
